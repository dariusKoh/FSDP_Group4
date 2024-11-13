const docker = require('./docker-container-management');
const tests = require('./scripts/run-tests');

// Create the Selenium Grid and run tests
docker.setupSeleniumGrid()
    .then(() => docker.listContainersOnNetwork())
    .then(() => tests.runTests())
    .catch(error => {
        console.error("Error in Selenium Grid setup:", error);
    });

// const { exec } = require('child_process');
// exec('docker compose up', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error executing compose: ${error.message}`);
//         return;
//     }

//     console.log(`Output:\n${stdout}`);
//     if (stderr) {
//         console.error(`Errors:\n${stderr}`);
//     }
// });