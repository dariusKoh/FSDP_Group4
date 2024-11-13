const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const path = require('path');
const constants = {
  FILE_PATH: path.join(__dirname, '../tests'),
  TEST_ID_PREFIX: "TC_",
  MONGO_URI: "mongodb+srv://clive:password1234@cluster1.kv3es.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1",
};

const client = new MongoClient(constants.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function pushScripts() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const db = client.db();
    const collection = db.collection('scripts');

    const count = await collection.countDocuments();
    console.log(`Current document count: ${count}`);

    // Wait for the scripts to be parsed
    const parsedData = await parseScripts();
    if (Array.isArray(parsedData)) {
      console.log("scripts is an array");
    } else {
      console.log("scripts is not an array");
    }

    // Map over the parsed scripts and create document objects
    const documents = parsedData.map((script) => {
      const { scriptName, scriptContent } = script;
      console.log(`Script name: ${scriptName}\nScript content: ${scriptContent}\n`);
      return { scriptName, scriptContent };
    });

    // Insert the documents into MongoDB
    const result = await collection.insertMany(documents);
    console.log(`Inserted ${result.insertedCount} documents into the collection`);
  } finally {
    await client.close();
  }
}

async function parseScripts() {
  const scripts = [];

  // Return a Promise that resolves when all files have been processed
  const files = await fs.promises.readdir(constants.FILE_PATH);

  // Use map to create an array of Promises
  const scriptPromises = files.map(async (file) => {
    try {
      const data = await fs.promises.readFile(path.join(constants.FILE_PATH, file), 'utf8');
      return {
        scriptName: file,
        scriptContent: data
      };
    } catch (err) {
      console.error(`Error reading file ${file}:`, err);
      return null; // Return null for files that couldn't be read
    }
  });

  // Wait for all files to be read
  const scriptsData = await Promise.all(scriptPromises);

  // Filter out any null values (for files that had errors)
  return scriptsData.filter(script => script !== null);
}


pushScripts().catch(console.dir);