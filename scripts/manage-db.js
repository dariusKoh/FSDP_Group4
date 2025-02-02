const { MongoClient, ServerApiVersion } = require('mongodb');
const constants = {
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

// Function to check if a collection exists
async function collectionExists(dbo, collectionName) {
    const collections = await dbo.listCollections({ name: collectionName }).toArray();
    return collections.length > 0;
  }
  
  // Function to drop collections if they exist
  async function dropCollections(dbo) {
    const collections = ['projects', 'scripts', 'test_results', 'users'];
  
    for (const collection of collections) {
      const exists = await collectionExists(dbo, collection);
  
      if (exists) {
        await dbo.collection(collection).drop();
        console.log(`Dropped collection '${collection}'`);
      } else {
        console.log(`Collection '${collection}' does not exist`);
      }
    }
  }
  
  // Function to create collections if they do not exist
  async function createCollections(dbo) {
    const collections = ['projects', 'scripts', 'test_results', 'users'];
  
    for (const collection of collections) {
      const exists = await collectionExists(dbo, collection);
  
      if (!exists) {
        await dbo.createCollection(collection);
        console.log(`Created collection '${collection}'`);
      } else {
        console.log(`Collection '${collection}' already exists`);
      }
    }
  }
  
  // Main function to execute the drop or create operations
  async function main() {
    try {
      // Connect to the MongoDB client
      await client.connect();
      
      const dbo = client.db(); // Get the default database (you can specify the database if needed)
  
      // Drop collections if they exist
      await dropCollections(dbo);
      
      // Create collections if they do not exist
      await createCollections(dbo);
  
    } catch (err) {
      console.error("Error in main process:", err);
    } finally {
      // Close the connection to the MongoDB client once all operations are complete
      await client.close();
    }
  }

// Call the main function to execute the operations
main();

