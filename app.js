const { exec } = require('child_process');
const docker = require('./docker-container-management');


docker.setupSeleniumGrid()
    .then(() => docker.createContainers(2))
    .catch(error => {
        console.error("Error in Selenium Grid setup:", error);
    });



// Run tests
// exec('npm test', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error executing npm test: ${error.message}`);
//         return;
//     }

//     console.log(`Output:\n${stdout}`);
//     if (stderr) {
//         console.error(`Errors:\n${stderr}`);
//     }
// });