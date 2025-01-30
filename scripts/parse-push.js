const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require("fs");
const path = "../jest-stare/jest-results.json";
const constants = {
  FILE_PATH: path,
  TEST_ID_PREFIX: "TC_",
  MONGO_URI:
    "mongodb+srv://teoyuanmao20:Password1234@cluster1.kv3es.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1",
};

const client = new MongoClient(constants.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  console.log("parse-push.js run");
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const db = client.db();
    const collection = db.collection("test_results");

    const count = await collection.countDocuments();
    console.log(`Current document count: ${count}`);

    const data = fs.readFileSync(constants.FILE_PATH);
    const obj = JSON.parse(data);
    const testResults = obj.testResults[0].testResults;
    const perfStats = obj.testResults[0].perfStats;
    const {
      numFailedTests,
      numPassedTests,
      numPendingTests,
      numTodoTests,
      numTotalTests,
    } = obj;
    const totalDuration = parseInt(perfStats.runtime, 10) / 1000;

    console.log("Test Summary:");
    const documents = testResults.map((test, index) => {
      const testId = `${constants.TEST_ID_PREFIX}${count + index + 1}`;
      const ancestorTitles = test.ancestorTitles;
      const duration = test.duration;
      const status = test.status.toUpperCase();
      const testFailureMessages =
        test.failureMessages.length === 0 ? "None" : test.failureMessages;

      console.log(
        `Test id: ${testId}\nTest name: ${ancestorTitles}\nStatus: ${status}\nDuration: ${duration}ms\nFailure messages: ${testFailureMessages}\n`
      );

      return {
        testId,
        ancestorTitles,
        duration,
        status,
        failureMessages: testFailureMessages,
      };
    });

    const result = await collection.insertMany(documents);
    console.log(
      `Inserted ${result.insertedCount} documents into the collection`
    );

    console.log(
      `Total tests: ${numTotalTests}\nTotal failed: ${numFailedTests}\nTotal passed: ${numPassedTests}\nTotal pending: ${numPendingTests}\nTotal todo: ${numTodoTests}\nTotal duration: ${totalDuration}s`
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
