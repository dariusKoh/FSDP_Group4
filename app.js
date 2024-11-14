const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { runTests } = require('./scripts/run-tests'); // Import runTests
const app = express();
const port = 3001;


const constants = {
    MONGO_URI: "mongodb+srv://teoyuanmao20:Password1234@cluster1.kv3es.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1",
};

const client = new MongoClient(constants.MONGO_URI);

app.use(cors());
app.use(express.json());

// API to trigger test run
app.get('/run-tests', async (req, res) => {
    try {
        await runTests(); // Call runTests function
        res.status(200).json({ message: "Tests started successfully" });
    } catch (error) {
        console.error("Failed to start tests:", error);
        res.status(500).json({ error: "Failed to start tests" });
    }
});

// API to fetch test logs from MongoDB
app.get('/get-logs', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('test');
        const collection = db.collection('test_results');
        const logs = await collection.find().sort({ createdAt: -1 }).toArray();
        res.json(logs);
    } catch (error) {
        console.error("Error fetching logs from MongoDB:", error);
        res.status(500).send("Failed to fetch logs");
    } finally {
        await client.close();
    }
});



// API to fetch test cases from MongoDB
app.get('/get-test-cases', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('test');
        const collection = db.collection('scripts');
        const testCases = await collection.find().sort({ createdAt: -1 }).toArray();
        res.json(testCases);
    } catch (error) {
        console.error("Error fetching test cases from MongoDB:", error);
        res.status(500).send("Failed to fetch test cases");
    } finally {
        await client.close();
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
