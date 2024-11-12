const Docker = require('dockerode');
//const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const docker = new Docker({ socketPath: '//./pipe/docker_engine' });

async function startSeleniumHub() {
    await docker.pull('selenium/hub');
    const hub = await docker.createContainer({
        Image: 'selenium/hub',
        name: 'selenium-hub',
        ExposedPorts: { '4444:4444': {} },
        Env: [
            'SE_EVENT_BUS_PUBLISH_PORT=4442',
            'SE_EVENT_BUS_SUBSCRIBE_PORT=4443'
        ],
        HostConfig: {
            PortBindings: { '4444:4444': [{ HostPort: '4444' }] },
        },
    });
    await hub.start();
}

async function startBrowserNode(image, name) {
    console.log("Starting pull");
    await docker.pull(image, (err, stream) => {
        if (err) {
            throw err;
        }

        console.log(`Pulling image ${image}...`);

        docker.modem.followProgress(stream, (err, output) => {
            if (err) {
                throw err;
            }
            console.log(`Pulled image ${image}.`);
        })
    });
    const node = await docker.createContainer({
        Image: image,
        name: name,
        Env: [
        'SE_EVENT_BUS_HOST=selenium-hub',
        'SE_EVENT_BUS_PUBLISH_PORT=4442',
        'SE_EVENT_BUS_SUBSCRIBE_PORT=4443'
        ],
        HostConfig: { NetworkMode: 'bridge' },
    });
    await node.start();
    console.log(`Started container ${name} with id ${node.id} with image ${image}.`);
}

// Run the Hub and nodes
async function setupSeleniumGrid() {
    console.log('Setting up Selenium Grid...');
    await startSeleniumHub();
    await startBrowserNode('selenium/node-chrome', 'chrome-node');
    await startBrowserNode('selenium/node-firefox', 'firefox-node');
    await startBrowserNode('selenium/node-edge', 'edge-node');
}

// Create a container for each browser
async function createContainers(containers) {
    for (var i = 0; i < containers; i++) {
        await startBrowserNode('selenium/node-chrome', 'chrome-node');
        await startBrowserNode('selenium/node-firefox', 'firefox-node');
        await startBrowserNode('selenium/node-edge', 'edge-node');
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
    stopContainer,
    stopAllContainers,
    listContainers
};