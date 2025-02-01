const Docker = require("dockerode");
const docker = new Docker({ socketPath: "//./pipe/docker_engine" });

// Create and pull Docker images
async function pullImage(imageName) {
	try {
		// Check if image already exists
		const images = await docker.listImages();
		if (images.some((image) => image.RepoTags?.includes(imageName))) {
			console.log(`Image ${imageName} already exists, skipping pull.`);
			return;
		}

		return new Promise((resolve, reject) => {
			docker.pull(imageName, (err, stream) => {
				if (err) return reject(err);

				docker.modem.followProgress(stream, (err) => {
					if (err) return reject(err);
					console.log(`Image ${imageName} pulled successfully.`);
					resolve();
				});
			});
		});
	} catch (error) {
		console.error(`Error pulling image ${imageName}: ${error.message}`);
	}
}

// Create a network for the Selenium Grid
async function createNetwork() {
	try {
		const network = await docker.createNetwork({
			Name: "selenium-network",
			CheckDuplicate: true,
			Driver: "bridge", // Use 'bridge' for isolated networks
		});
		console.log(`Network ${network.Name} created with ID: ${network.id}`);
		return network;
	} catch (error) {
		if (error.statusCode !== 409) {
			console.error(`Error creating network: ${error}`);
		}
	}
}

// Setup the Selenium Grid with a hub and browser nodes
async function setupSeleniumGrid() {
	console.log("Setting up Selenium Grid...");

	// Pull the images
	await pullImage("selenium/hub");
	await createNetwork();

	// Create the Selenium Hub container
	try {
		const hub = await docker.createContainer({
			Image: "selenium/hub",
			name: "selenium-hub",
			ExposedPorts: {
				"4442/tcp": {},
				"4443/tcp": {},
				"4444/tcp": {},
			},
			HostConfig: {
				NetworkMode: "selenium-network",
				PortBindings: {
					"4442/tcp": [{ HostPort: "4442" }],
					"4443/tcp": [{ HostPort: "4443" }],
					"4444/tcp": [{ HostPort: "4444" }],
				},
			},
		});

		await hub.start();
		console.log("Selenium Hub started");

		// Pull browser images in parallel
		console.log("Creating images for browsers...");
		await Promise.all([
			pullImage("selenium/node-chrome"),
			pullImage("selenium/node-firefox"),
			pullImage("selenium/node-edge"),
		]);
	} catch (error) {
		console.error("Error starting Selenium Hub:", error);
	}
}

// Start a browser node container
async function startBrowserNode(image, name) {
	// Check if the container already exists
	const existingContainers = await listContainers();
	if (existingContainers.some((c) => c.name === `/${name}`)) {
		console.log(`Container ${name} already exists. Skipping creation.`);
		return;
	}

	// Ensure the hub is ready before starting nodes
	const hubStatus = await docker.getContainer("selenium-hub").inspect();
	if (!hubStatus.State.Running) {
		try {
			await docker.getContainer("selenium-hub").start();
		} catch (error) {
			console.error(`Error starting selenium-hub: ${error.message}`);
		}
	}

	// Ensure that image exists
	await pullImage(image);

	// Create and start the container in detached mode
	try {
		console.log("Creating container for image", image);

		const node = await docker.createContainer({
			Image: image,
			name: name,
			Env: [
				"SE_EVENT_BUS_HOST=selenium-hub",
				"SE_EVENT_BUS_PUBLISH_PORT=4442",
				"SE_EVENT_BUS_SUBSCRIBE_PORT=4443",
			],
			HostConfig: { NetworkMode: "selenium-network" },
		});
		await node.start();
		console.log(
			`Started container ${name} with id ${node.id} with image ${image}.`
		);
	} catch (error) {
		console.error(
			`Error starting container for image ${image}: ${error.message}`
		);
	}
}

// Create a container for each browser
async function createContainers(containers) {
	// Get all running containers
	const runningContainers = await listContainers();
	console.log("Running Containers:", runningContainers.length);

	// Check if there are container nodes running, else set to 0
	let nodesPerBrowser =
		runningContainers.length < 1 ? 0 : (runningContainers.length - 1) / 3;

	for (var i = 0; i < containers; i++) {
		await Promise.all([
			startBrowserNode(
				"selenium/node-chrome",
				`chrome-node-${nodesPerBrowser + i + 1}`
			),
			startBrowserNode(
				"selenium/node-firefox",
				`firefox-node-${nodesPerBrowser + i + 1}`
			),
			startBrowserNode(
				"selenium/node-edge",
				`edge-node-${nodesPerBrowser + i + 1}`
			),
		]);
	}
}

// Stop and remove a container
async function stopContainer(containerId) {
	try {
		const container = docker.getContainer(containerId);
		const containerName = (await container.inspect()).Name;
		await container.stop({ t: 0 });
		await container.remove();
		console.log(
			`Container ${containerName} (${containerId}) stopped and removed.`
		);
	} catch (error) {
		console.error(`Failed to stop container: ${error.message}`);
	}
}

// Stop and remove an image
async function removeImage(imageId) {
	try {
		const image = docker.getImage(imageId);
		await image.remove();
		console.log(`Removed image with ID: ${image.id}`);
	} catch (error) {
		console.error(`Failed to remove image: ${error.message}`);
	}
}

// Stop and remove all containers
async function stopAllContainers() {
	try {
		const containers = await listContainersOnNetwork();

		// Filter out selenium-hub
		const containersToStop = containers.filter(
			(container) => !container[1].Name.includes("selenium-hub")
		);

		// Stop all containers in parallel
		await Promise.all(
			containersToStop.map((container) => stopContainer(container[0]))
		);
		console.log("Stopped and removed all containers.");
	} catch (error) {
		console.error(
			`Failed to stop and remove all containers: ${error.message}`
		);
	}
}

// Stop and remove all images
async function removeAllImages() {
	try {
		const images = await docker.listImages();
		for (const image of images) {
			await removeImage(image.Id);
		}
		console.log("Removed all images.");
	} catch (error) {
		console.error(`Failed to remove all images: ${error.message}`);
	}
}

// Stop and remove all containers and images
async function removeAllContainersAndImages() {
	await stopAllContainers().then(() => removeAllImages());
}

// List all containers
async function listContainers(returntype) {
	try {
		// List all containers
		const containers = await docker.listContainers({ all: true });

		// Extract container IDs
		const containerInfo = containers.map((container) => ({
			id: container.Id,
			name: container.Names[0], // First name if multiple names are assigned
		}));

		//console.log("Running Containers:", containerInfo, containers);

		if (returntype === 1) {
			return containers;
		}
		return containerInfo;
	} catch (error) {
		console.error("Error fetching running containers:", error);
	}
}

// List all containers on the selenium-network
async function listContainersOnNetwork() {
	try {
		const network = docker.getNetwork("selenium-network");
		const networkDetails = await network.inspect();
		// Get containers on the network
		const containers = Object.entries(networkDetails.Containers);
		return containers;
	} catch (error) {
		console.error(
			`Error listing containers on network selenium-network: ${error}`
		);
	}
}

// Function to run `npm test` in each container
async function runTestInContainers() {
	const containers = await listContainers(1);
	//console.log(containers);

	for (const containerInfo of containers) {
		//console.log(containerInfo);

		// Skip the selenium-hub container
		if (containerInfo.Names[0].includes("selenium-hub")) {
			console.log(
				`Skipping container ${containerInfo.Names[0]} with id ${containerInfo.Id}`
			);
			continue;
		}

		console.log(
			`Running npm test in container: ${containerInfo.Names[0]} with id ${containerInfo.Id}`
		);

		// Get the full container instance by ID
		const container = docker.getContainer(containerInfo.Id);

		// Check the container status and start if necessary
		const containerData = await container.inspect();
		const containerStatus = containerData.State.Status;

		if (containerStatus === "exited" || containerStatus === "paused") {
			console.log(
				`Container ${containerInfo.Names[0]} is ${containerStatus}. Restarting...`
			);
			await container.start();
			console.log(`Container ${containerInfo.Names[0]} restarted.`);
		}

		// Create an exec instance to run `npm test`
		const exec = await container.exec({
			Cmd: ["npm", "test"],
			AttachStdout: true,
			AttachStderr: true,
		});

		// Start the exec instance and handle output
		exec.start((err, stream) => {
			if (err) {
				console.error(
					`Error running npm test in container ${containerInfo.Names[0]}:`,
					err
				);
				return;
			}

			// Attach stream to console log output
			stream.on("data", (data) => {
				console.log(
					`Output from container ${
						containerInfo.Names[0]
					}:\n${data.toString()}`
				);
			});

			stream.on("end", () => {
				console.log(
					`npm test completed in container ${containerInfo.Names[0]}`
				);
			});
		});
	}
}

module.exports = {
	setupSeleniumGrid,
	createContainers,
	stopContainer,
	stopAllContainers,
	removeImage,
	removeAllImages,
	removeAllContainersAndImages,
	listContainers,
	listContainersOnNetwork,
	runTestInContainers,
};
