const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const path = require('path');
const constants = {
  FILE_PATH: path.join(__dirname, '../jest-stare', 'jest-results.json'),
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

async function pushResults({
  stdout,
  stderr,
  createdAt,
  projectId,
  projectName,
  testStatus,
  executionTime,
  testResultsSummary,
  userId
}) {
  const db = client.db('test');
  const collection = db.collection('test_results');

  const resultData = {
      stdout,
      stderr,
      createdAt,
      projectId,
      projectName,
      testStatus,
      executionTime,
      testResultsSummary,
      userId,
  };

  try {
      await collection.insertOne(resultData);
      console.log("Test results successfully inserted into the database.");
  } catch (error) {
      console.error("Error inserting test results:", error);
  }
}

module.exports = {
  pushResults
}


module.exports = { pushResults }; 