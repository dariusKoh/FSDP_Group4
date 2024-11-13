const Docker = require('dockerode');
//const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const docker = new Docker({ socketPath: '//./pipe/docker_engine' });

async function pullImage(imageName) {
    try {
        return new Promise((resolve, reject) => {
            docker.pull(imageName, (err, stream) => {
                if (err) return reject(err);

                docker.modem.followProgress(stream, (err, output) => {
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

async function startSeleniumHub() {
    // Pull the images
    await pullImage('selenium/hub');

    const hub = await docker.createContainer({
        Image: 'selenium/hub',
        name: 'selenium-hub',
        ExposedPorts: { 
            '4442/tcp': {},
            '4443/tcp': {},
            '4444/tcp': {},
        },
        HostConfig: {
            PortBindings: { 
                '4442/tcp': [{ HostPort: '4442' }],
                '4443/tcp': [{ HostPort: '4443' }],
                '4444/tcp': [{ HostPort: '4444' }],
            },
        },
    });

    await hub.start();
    console.log("Selenium Hub started");
}

async function startBrowserNode(image, name) {
    // Ensure that image exists
    await pullImage(image);

    console.log("Creating container for image", image);

    const node = await docker.createContainer({
        Image: image,
        name: name,
        Env: [
            'SE_EVENT_BUS_HOST=selenium-hub',
            'SE_EVENT_BUS_PUBLISH_PORT=4442',
            'SE_EVENT_BUS_SUBSCRIBE_PORT=4443',
        ],
        HostConfig: { NetworkMode: 'bridge' },
    });
    await node.start();
    console.log(`Started container ${name} with id ${node.id} with image ${image}.`);
}

// Run the Hub and nodes
async function setupSeleniumGrid() {
    console.log('Setting up Selenium Grid...');

    // Start Sekeium Hub image and container
    await startSeleniumHub();

    // Start image and container for each browser
    await createContainers(1);

    console.log('Selenium Grid setup complete');
}

// Create a container for each browser
async function createContainers(containers) {
    const runningContainers = await getRunningContainers();
    console.log("Running Containers:", runningContainers.length);

    // Check if there are container nodes running, else set to 0
    let nodesPerBrowser = runningContainers.length < 1 ? 0 : (runningContainers.length - 1) / 3;

    for (var i = 0; i < containers; i++) {
        console.log(i)
        await startBrowserNode('selenium/node-chrome', `chrome-node-${nodesPerBrowser + i + 1}`);
        await startBrowserNode('selenium/node-firefox', `firefox-node-${nodesPerBrowser + i + 1}`);
        await startBrowserNode('selenium/node-edge', `edge-node-${nodesPerBrowser + i + 1}`);
    }
}

async function getRunningContainers() {
    try {
        // List only running containers
        const containers = await docker.listContainers({ filters: { status: ["running"] } });
        
        // Extract container IDs
        const containerInfo = containers.map(container => ({
            id: container.Id,
            name: container.Names[0] // First name if multiple names are assigned
        }));
        return containerInfo;
    } catch (error) {
        console.error("Error fetching running containers:", error);
    }
}

// Stop and remove a container
async function stopContainer(containerId) {
    try {
        const container = docker.getContainer(containerId);
        await container.stop();
        await container.remove();
        console.log(`Container ${containerId} stopped and removed.`);
    } catch (error) {
        console.error(`Failed to stop container: ${error.message}`);
    }
}

// Stop and remove all containers
async function stopAllContainers() {
    try {
        const containers = await listContainers();
        for (const container of containers) {
            await stopContainer(container.Id);
        }
        console.log('Stopped and removed all containers.');
    } catch (error) {
        console.error(`Failed to stop and remove all containers: ${error.message}`);
    }
}

// List all running containers
async function listContainers() {
    try {
        const containers = await docker.listContainers();
        console.log('Running Containers:', containers);
        return containers;
    } catch (error) {
        console.error(`Failed to list containers: ${error.message}`);
    }
}

module.exports = {
    setupSeleniumGrid,
    createContainers,
    getRunningContainers,
    stopContainer,
    stopAllContainers,
    listContainers
};