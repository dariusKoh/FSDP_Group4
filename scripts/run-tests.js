const { exec } = require('child_process');
const docker = require('./docker-management');

const { pushResults } = require('./insert-db');
const { run } = require('jest');

// Run tests and return the output
async function runTests() {
    console.log("Running tests...");

    return new Promise((resolve, reject) => {
        // Execute ``npm test`` in the current directory
        exec('npm test', (error, stdout, stderr) => {
            /*if (error) {
                console.error(`Error executing npm test: ${error.message}`);
                reject(error);
            }*/
        
            console.log(`Output:\n${stdout}`);
            if (stderr) {
                console.error(`Errors:\n${stderr}`);
            }
            resolve(stdout);
        });
    });
}

async function runTestInContainers() {
    // Sets up the Selenium Grid, creates a container, runs tests, and cleans up
    docker.setupSeleniumGrid()
        .then(() => docker.createContainers(1))
        .then(() => {
            return runTests();
        })
        .then(() => {
            console.log("Tests completed. Proceeding to clean up...");
        })
        .then(() => {
            return pushResults();
        })
        .catch(error => {
            console.error("Error during setup or test execution:", error);
        })
        .finally(() => {
            console.log("Cleaning up containers...");
            docker.stopAllContainers()
                .then(() => console.log("All containers removed successfully."))
                .catch(error => console.error("Error removing containers:", error));
        });
}

//runTestInContainers();

module.exports = {
    runTestInContainers
}