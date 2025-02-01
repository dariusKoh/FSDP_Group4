const fs = require("fs");
const path = require("path");

const { exec } = require("child_process");
const docker = require("./docker-management");

const { pushResults } = require("./insert-db");
const { run } = require("jest");

const TESTS_DIR = path.join(__dirname, "../tests");

// Function to get a list of test files
function getTestFiles() {
	return new Promise((resolve, reject) => {
		fs.readdir(TESTS_DIR, (err, files) => {
			if (err) {
				console.error("Error reading test directory:", err);
				return reject("Failed to load test files");
			}

			const testFiles = files.filter(
				(file) => file.endsWith(".test.js") || file.endsWith(".spec.js")
			);
			resolve(testFiles);
		});
	});
}

// Run tests and return the output
async function runTests(selectedFiles = []) {
	try {
		console.log("Fetching available test files...");
		const testFiles = await getTestFiles();

		// Run all files if not specified
		if (selectedFiles.length === 0) {
			console.warn(
				"No specific test files selected. Running all test files..."
			);
			selectedFiles = testFiles;
		}

		// Check if any test files were found AFTER loading them
		if (selectedFiles.length === 0) {
			console.log("No test files found.");
			return;
		}

		// Run tests using exec
		console.log(`Running tests: ${selectedFiles.join(", ")}`);

		return new Promise((resolve, reject) => {
			const testCommand = `npx jest ${selectedFiles.join(" ")}`;

			exec(testCommand, (error, stdout, stderr) => {
				// if (error) {
				// 	console.error(`Test execution error: ${error.message}`);
				// 	return reject(error.message);
				// }

				console.log(`Test Output:\n${stdout}`);
				if (stderr) console.error(`Test Errors:\n${stderr}`);

				resolve(stdout);
			});
		});
	} catch (error) {
		console.error("Error running tests:", error);
		throw error;
	}
}

async function runTestInContainers(
	proj_id,
	username,
	containers = 1,
	selectedFiles = []
) {
	try {
		// Default code testresults
		var testResults = { success: false };

		await docker.setupSeleniumGrid();
		await docker.createContainers(containers);
		await runTests(selectedFiles);

		console.log("Tests completed. Proceeding to push results...");
		try {
			// Attempt to push results
			testResults = await pushResults(proj_id, username);
			console.log("Test results pushed successfully.");
		} catch (error) {
			// Log if there's an issue pushing results
			console.error("Error pushing test results:", error);
			// Ensure we still have a valid testResults object
			testResults = { success: false, error: "Failed to push results" };
		}

		console.log("Cleaning up containers...");
		await docker.stopAllContainers();
		console.log("All containers removed successfully.");

		// Check the test results (for Git Hook helper function)
		if (testResults && testResults.success) {
			console.log("All tests passed!");
			return { success: true };
		} else {
			// Ensure testResults exists before referencing its properties
			console.log(
				"Tests failed. Reason: " + testResults && testResults.error
					? testResults.error
					: "Tests did not pass."
			);
			return {
				success: false,
				error:
					testResults && testResults.error
						? testResults.error
						: "Tests did not pass.",
			};
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
	getTestFiles,
};
