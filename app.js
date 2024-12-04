const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const { runTestInContainers } = require('./scripts/run-tests'); // Import runTests
const dbQuery = require('./scripts/query-db'); // Import databse query script
const { pushScripts } = require('./scripts/push-scripts'); // Import pushScripts
const { run } = require('jest');
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
    console.log("App.js run-tests");
    try {
        await runTestInContainers(); // Call runTests function
        res.status(200).json({ message: "Tests started successfully" });
    } catch (error) {
        console.error("Failed to start tests:", error);
        res.status(500).json({ error: "Failed to start tests" });
    }
});

app.post('/create-project', async (req, res) => {
    const { projectName, visibility, files } = req.body;

    try {
        await client.connect();
        const db = client.db('test');
        const projectsCollection = db.collection('projects');
        const scriptsCollection = db.collection('scripts');

        // Get the current count of projects for unique ID
        const projectCount = await projectsCollection.countDocuments();
        const newProjectId = projectCount + 1;

        // Create project object
        const newProject = {
            proj_id: newProjectId,
            projectName,
            visibility,
            createdAt: new Date(),
        };

        // Insert the project
        const projectResult = await projectsCollection.insertOne(newProject);

        // Insert scripts associated with the project
        const scriptDocuments = files.map(file => ({
            proj_id: newProjectId,
            scriptName: file.name,
            scriptContent: file.content,
            createdAt: new Date(),
        }));
        await scriptsCollection.insertMany(scriptDocuments);

        res.status(201).json({ message: "Project created successfully", project: newProject });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: "Failed to create project" });
    } finally {
        await client.close();
    }
});


// API to fetch test logs from MongoDB
app.get('/get-logs', async (req, res) => {
    try {
        const logs = await dbQuery.queryAllData('test_results'); // Call queryAllData function
        res.json(logs);
    } catch (error) {
        console.error("Error fetching logs from MongoDB:", error);
        res.status(500).json({ error: "Failed to fetch logs" });
    } finally {
        await client.close();
    }
});

// API to fetch all projects
app.get('/projects', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('test');
        const collection = db.collection('projects');

        const projects = await collection.find({}).toArray(); // Get all projects
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Failed to fetch projects" });
    } finally {
        await client.close();
    }
});


// API to fetch test cases from MongoDB
app.get('/get-scripts', async (req, res) => {
    try {
        const scripts = await dbQuery.queryAllData('scripts'); // Call queryAllData function 
        res.json(scripts);
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