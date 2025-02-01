const { exec } = require("child_process");
const docker = require("./docker-management");

const { pushResults } = require("./insert-db");
const { run } = require("jest");

// Run tests and return the output
async function runTests() {
	console.log("Running tests...");

	return new Promise((resolve, reject) => {
		// Execute ``npm test`` in the current directory
		exec("npm test", (error, stdout, stderr) => {
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

async function runTestInContainers(proj_id) {
	try {
		await docker.setupSeleniumGrid();
		await docker.createContainers(1);
		await runTests();

		console.log("Tests completed. Proceeding to push results...");
		const testResults = await pushResults(proj_id); // Await the pushResults call

		console.log("Cleaning up containers...");
		await docker.stopAllContainers();
		console.log("All containers removed successfully.");

		// Check the test results (for Git Hook helper function)
		if (testResults.success) {
			console.log("All tests passed!");
			return { success: true };
		} else {
			console.log("Tests failed. Reason: Tests did not pass.");
			return { success: false, error: "Tests failed" };
		}
	} catch (error) {
		console.error("Error during test execution or cleanup:", error);
		throw error; // Propagate error to the calling function
	}
}

// Git Hook helper function
async function runTestsOnLocalRepo() {
	try {
		// Ensure we are awaiting the result of runTestInContainers
		const testResults = await runTestInContainers(); // This will wait until everything is complete.

		if (!testResults.success) {
			console.log("Tests failed:", testResults.error);
			throw new Error("Tests failed");
		}

		console.log("Tests passed successfully!");
	} catch (error) {
		console.error("Error running tests:", error);
		throw error; // Re-throw error to be caught in the webhook handler
	}
}

//runTestInContainers();

module.exports = {
	runTestInContainers,
	runTestsOnLocalRepo,
};
