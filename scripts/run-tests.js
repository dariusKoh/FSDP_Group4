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
            if (error) {
                console.error(`Error executing npm test: ${error.message}`);
                reject(error);
            }

            console.log(`Output:\n${stdout}`);
            if (stderr) {
                console.error(`Errors:\n${stderr}`);
            }

            // Return the output of the test run
            resolve({ stdout, stderr });
        });
    });
}

async function runTestInContainers(projectId, projectName, userId) {
    try {
        console.log(`Running tests for project: ${projectName} (ID: ${projectId})`);

        // 1. Start the Docker containers and set up Selenium Grid
        await docker.setupSeleniumGrid();
        await docker.createContainers(1);  // Assuming you're creating 1 container

        // 2. Run the tests (wait for the tests to complete before proceeding)
        const testOutput = await runTests();  // This will wait until the tests are finished
        console.log(`Test results: ${testOutput}`);

        // 3. Push results to DB (add projectId, projectName, userId to results)
        await pushResults(testOutput, projectId, projectName, userId);

        console.log("Test results pushed to the database");

        // 4. Clean up containers
        await docker.stopAllContainers();
        console.log("Containers stopped and removed");

    } catch (error) {
        console.error("Error during test execution:", error);
        throw error; // Rethrow error to be caught in the API handler
    }
}


// Generate a summary of the test results from the output
function generateTestSummary(output) {
    const passed = (output.match(/PASS/g) || []).length;
    const failed = (output.match(/FAIL/g) || []).length;
    const skipped = (output.match(/SKIPPED/g) || []).length;

    return {
        passed,
        failed,
        skipped
    };
}

module.exports = {
    runTestInContainers
}
