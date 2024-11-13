const docker = require('./scripts/docker-management');
const tests = require('./scripts/run-tests');

// Create the Selenium Grid and run tests
docker.setupSeleniumGrid()
    .then(() => tests.runTests())
    .catch(error => {
        console.error("Error in Selenium Grid setup:", error);
    });