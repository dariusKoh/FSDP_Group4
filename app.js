const express = require('express');
const docker = require('./scripts/docker-management');
const tests = require('./scripts/run-tests');
const cors = require('cors');



const app = express();
const port = 3001; // You can adjust the port if needed
app.use(cors());
// Endpoint to run tests
app.get('/run-tests', async (req, res) => {
    try {
        await docker.setupSeleniumGrid();
        await tests.runTests();
        res.status(200).json({ message: "Tests completed" });
    } catch (error) {
        console.error("Error during Selenium Grid setup or tests:", error);
        res.status(500).json({ message: "Error running tests", error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
