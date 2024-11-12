const { exec } = require('child_process');
const docker = require('./docker-container-management');

docker.setupSeleniumGrid();
docker.createContainers(2);



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