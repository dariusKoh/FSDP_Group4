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


/**
 * Function to query the MongoDB database and fetch data
 * @param {string} dbName - The name of the database.
 * @param {string} collectionName - The name of the collection.
 * @param {object} query - The query object for filtering documents.
 * @returns {Promise<Array>} - Returns a promise that resolves with an array of documents.
 */
async function queryDataByUserId(collectionName, userId) {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Select the database and collection
        const db = client.db();
        const collection = db.collection(collectionName);

        const query = { userid: userId };
        // Execute the query and fetch the results
        const results = await collection.find(query).toArray();
        console.log(`Found ${results.length} documents that match the query.`);
        // Return the results
        return results;
    } catch (error) {
        console.error("Error querying data:", error);
        throw error;
    } finally {
        // Close the connection to the database
        await client.close();
    }
}

async function queryDataByproj_id(collectionName, proj_id) {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Select the database and collection
        const db = client.db();
        const collection = db.collection(collectionName);
        const query = { proj_id: proj_id };
        console.log("Fetching from here to view: Project ID" + proj_id)
        // Execute the query and fetch the results
        const results = await collection.find(query).toArray();
        console.log(`Found ${results.length} documents that match the query.`);
        // Return the results
        return results;
    } catch (error) {
        console.error("Error querying data:", error);
        throw error;
    } finally {
        // Close the connection to the database
        await client.close();
    }
}

async function queryAllData(collectionName) {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Select the database and collection
        const db = client.db();
        const collection = db.collection(collectionName);

        // Execute the query and fetch the results
        const results = await collection.find({}, {"sort" : ['datefield', 'asc']} ).toArray(function(err,docs) {});
        console.log(`Found ${results.length} documents that match the query.`);
        // Return the results
        return results;
    } catch (error) {
        console.error("Error querying data:", error);
        throw error;
    } finally {
        // Close the connection to the database
        await client.close();
    }
}

//queryDataByUserId("scripts",7).then(console.log).catch(console.error);
//queryAllData("test_results").then(console.log).catch(console.error);

module.exports = { 
    queryAllData, 
    queryDataByUserId,
    queryDataByproj_id
};