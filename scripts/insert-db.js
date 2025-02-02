const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require("fs");
const path = require("path");
const { summuriseFailureMessages } = require("./gemini-ai");

const constants = {
	FILE_PATH: path.join(__dirname, "../jest-stare", "jest-results.json"),
	TEST_ID_PREFIX: "TC_",
	MONGO_URI:
		"mongodb+srv://teoyuanmao20:Password1234@cluster1.kv3es.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1",
};

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(constants.MONGO_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function pushResults(proj_id, username) {
	try {
		// Connect the client to the server (optional starting in v4.7)
		await client.connect();
		// Send a ping to confirm a successful connection
		await client.db("admin").command({ ping: 1 });
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!"
		);

		// Define collection and database
		const db = client.db();
		const usersCollection = db.collection("users");
		const testResultsCollection = db.collection("test_results");

		// Function to get user by name
		async function getUserByName(name) {
			try {
				const user = await usersCollection.findOne(
					{ username },
					{ projection: { _id: 0, userid: 1, name: 1 } }
				);
				return user;
			} catch (error) {
				console.log(error);
			}
		}

		// Get the current user
		const user = await getUserByName(username);

		if (!user) {
			console.log("User not found, proceeding with test result check...");
		}

		const data = fs.readFileSync(constants.FILE_PATH);
		const obj = JSON.parse(data);
		const testResults = obj.testResults.flatMap(
			(testResult) => testResult.testResults
		); // Flattening nested testResults
		const perfStats = obj.testResults[0].perfStats; // Performance stats from the first test suite

		const {
			numFailedTests,
			numPassedTests,
			numPendingTests,
			numTodoTests,
			numTotalTests,
		} = obj;
		const totalDuration = parseInt(perfStats.runtime, 10) / 1000; // Convert runtime to seconds

		// Perform the test checks even if no user is found
		console.log(
			"Passed Tests: " +
				numPassedTests +
				" / Total Tests: " +
				numTotalTests
		);
		if (numPassedTests === numTotalTests) {
			console.log("All test cases passed.");
		} else {
			console.log("Not all test cases passed.");
		}

		// If the user is not found, skip document insertion but still check tests
		if (!user) {
			return { success: numPassedTests === numTotalTests };
		}

		// If user exists, proceed with inserting the results into the DB
		const count = await testResultsCollection.countDocuments({
			userid: user.userid,
		});
		console.log(`Current document count for user ${username}: ${count}`);

		const summariesMap = {};

		const aiSummary = await summuriseFailureMessages(testResults);
		if (aiSummary.success) {
			console.log("\n\nGenerated Summaries:");
			aiSummary.summaries.forEach((summary) => {
				summariesMap[summary.testId] = summary.summary;
				console.log(`Test ${summary.testId}:`);
				console.log(`Summary: ${summary.summary}`);
				console.log("-------------------");
			});
		} else {
			console.error("Failed to generate summaries:", aiSummary.error);
		}

		// Map the test results and integrate AI summaries
		const documents = testResults.map((test, index) => {
			const testId = `${constants.TEST_ID_PREFIX}${index + 1}`;
			const ancestorTitles = test.ancestorTitles.join(" > "); // Join ancestor titles to create a hierarchy
			const fullTitle = test.fullName;
			const duration = test.duration;
			const status = test.status.toUpperCase();
			const failureMessages =
				test.failureMessages.length === 0
					? "None"
					: test.failureMessages.join("\n"); // Join failure messages if any
			const failureDetails =
				test.failureDetails.length === 0
					? "None"
					: test.failureDetails
							.map((detail) => detail.message)
							.join("\n");
			const createdAt = new Date();

			// Parse the AI-generated summary
			let summary = "None";
			if (status === "FAILED") {
				summary =
					summariesMap[testId] ||
					`The test failed but no detailed AI summary was provided. Failure Messages: ${failureMessages}`;
			}

			return {
				testId,
				ancestorTitles,
				fullTitle,
				duration,
				status,
				failureMessages,
				failureDetails,
				summary, // Add the AI-generated summary
				userid: user ? user.userid : null, // If user exists, use the user ID
				proj_id,
				createdAt,
			};
		});

		// Check if documents array is empty
		if (documents.length > 0 && user) {
			const result = await testResultsCollection.insertMany(documents);
			console.log(
				`Inserted ${result.insertedCount} documents into the collection for user ${username}`
			);
		} else {
			console.log("No documents to insert or user not found.");
		}

		// Return the result based on the test results
		return { success: numPassedTests === numTotalTests };
	} catch (error) {
		console.error("Failed to push results:", error);
		return { success: false };
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}

module.exports = { pushResults };
