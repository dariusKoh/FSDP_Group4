const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const path = "../jest-stare/jest-results.json";
const constants = {
  FILE_PATH: path,
  TEST_ID_PREFIX: "TC_",
  MONGO_URI: "mongodb+srv://teoyuanmao20:Password1234@cluster1.kv3es.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1",
};

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(constants.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Define collection and database
    const db = client.db();
    const usersCollection = db.collection('users');
    const testResultsCollection = db.collection('test_results');

    // Function to get user by name
    async function getUserByName(name) {
      try {
        const user = await usersCollection.findOne({ name }, { projection: { _id: 0, userid: 1, name: 1 } });
        return user;
      } catch (error) {
        console.log(error);
      }
    }

    // Get the current user
    const username = 'JunHao';
    const user = await getUserByName(username);
    if (!user) {
      console.log('User not found');
      return;
    }

    const count = await testResultsCollection.countDocuments({ userid: user.userid });
    console.log(`Current document count for user ${username}: ${count}`);

    const data = fs.readFileSync(constants.FILE_PATH);
    const obj = JSON.parse(data);
    const testResults = obj.testResults[0].testResults;
    const perfStats = obj.testResults[0].perfStats;
    const { numFailedTests, numPassedTests, numPendingTests, numTodoTests, numTotalTests } = obj;
    const totalDuration = parseInt(perfStats.runtime, 10) / 1000;

    console.log("Test Summary:");
    const documents = testResults.map((test, index) => {
      const testId = `${constants.TEST_ID_PREFIX}${count + index + 1}`;
      const ancestorTitles = test.ancestorTitles;
      const duration = test.duration;
      const status = test.status.toUpperCase();
      const testFailureMessages = test.failureMessages.length === 0 ? "None" : test.failureMessages;
      const createdAt = new Date(); 

      console.log(`Test id: ${testId}\nTest name: ${ancestorTitles}\nStatus: ${status}\nDuration: ${duration}ms\nFailure messages: ${testFailureMessages}\n`);

      return {
        testId,
        ancestorTitles,
        duration,
        status,
        failureMessages: testFailureMessages,
        userid: user.userid,
        createdAt, 
      };
    });

    // Check if documents array is empty
    if (documents.length > 0) {
      const result = await testResultsCollection.insertMany(documents);
      console.log(`Inserted ${result.insertedCount} documents into the collection for user ${username}`);
    } else {
      console.log('No documents to insert');
    }

    console.log(`Total tests: ${numTotalTests}\nTotal failed: ${numFailedTests}\nTotal passed: ${numPassedTests}\nTotal pending: ${numPendingTests}\nTotal todo: ${numTodoTests}\nTotal duration: ${totalDuration}s`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);