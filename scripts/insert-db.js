const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require("fs");
const path = require("path");
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

async function pushResults() {
  console.log("insert-db.js run");
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
          { name },
          { projection: { _id: 0, userid: 1, name: 1 } }
        );
        return user;
      } catch (error) {
        console.log(error);
      }
    }

    // Get the current user
    const username = "teoym";
    const user = await getUserByName(username);
    if (!user) {
      console.log("User not found");
      return;
    }

    const count = await testResultsCollection.countDocuments({
      userid: user.userid,
    });
    console.log(`Current document count for user ${username}: ${count}`);

    const data = fs.readFileSync(constants.FILE_PATH);
    const obj = JSON.parse(data);
    // Loop through the top-level test results
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

    console.log("Test Summary:");

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
          : test.failureDetails.map((detail) => detail.message).join("\n");
      const createdAt = new Date();

      // Log individual test details
      console.log(
        `Test id: ${testId}\nTest name: ${ancestorTitles}\nStatus: ${status}\nDuration: ${duration}ms\nFailure messages: ${failureMessages}\nFailure details: ${failureDetails}\n`
      );

      return {
        testId,
        ancestorTitles,
        fullTitle,
        duration,
        status,
        failureMessages,
        failureDetails,
        userid: user.userid, // Assuming `user` is defined elsewhere
        createdAt,
      };
    });

    // Check if documents array is empty
    if (documents.length > 0) {
      const result = await testResultsCollection.insertMany(documents);
      console.log(
        `Inserted ${result.insertedCount} documents into the collection for user ${username}`
      );
    } else {
      console.log("No documents to insert");
    }

    console.log(
      `Total tests: ${numTotalTests}\nTotal failed: ${numFailedTests}\nTotal passed: ${numPassedTests}\nTotal pending: ${numPendingTests}\nTotal todo: ${numTodoTests}\nTotal duration: ${totalDuration}s`
    );

    // Log if there are failed tests
    console.log("number of failed tests" + numFailedTests);
    if (numFailedTests > 0) {
      return { success: false };
    }
    return { success: true };
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = { pushResults };
