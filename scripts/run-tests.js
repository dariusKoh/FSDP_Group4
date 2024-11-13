const { exec } = require('child_process');
const docker = require('./docker-management');

// Execute ``npm test`` in the current directory
async function runTests() {
    console.log("Running tests...");
    exec('npm test', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing npm test: ${error.message}`);
            return;
        }
    
        console.log(`Output:\n${stdout}`);
        if (stderr) {
            console.error(`Errors:\n${stderr}`);
        }
    });
}

docker.setupSeleniumGrid()
    .then(() => runTests())
    .catch(error => {
        console.error("Error in Selenium Grid setup:", error);
    });

module.exports = {
    runTests
}