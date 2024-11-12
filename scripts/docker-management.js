const Docker = require('dockerode');
const docker = new Docker({ socketPath: '/var/run/docker.sock' }); // For Unix/Linux environments
const browsers = ['selenium/standalone-chrome', 'selenium/standalone-firefox', 'selenium/standalone-edge'];

// Create and start a new container
async function startContainer(image, name) {
    try {
        const container = await docker.createContainer({
            Image: image,
            name: name,
            Tty: true,
        });
        await container.start();
        console.log(`Container ${name} started.`);
        return container;
    } catch (error) {
        console.error(`Failed to start container: ${error.message}`);
    }
}

async function startBrowserContainers() {
    for (const browser of browsers) {
        await startContainer(browser, `${browser.split('/')[1]}_container`);
    }
    console.log('Started browser containers for testing.');
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