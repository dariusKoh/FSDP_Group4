const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Optional, for token-based authentication

const SECRET_KEY = "your_secret_key"; // Replace with a secure key for JWT


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
    // Temp owner id 1
    let ownerid = 1;
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
            owner_id: ownerid,
            shared_with: {},
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



// User login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        await client.connect();
        const db = client.db('test');
        const usersCollection = db.collection('users');

        // Find user by username
        const user = await usersCollection.findOne({ name: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate token (optional)
        const token = jwt.sign({ userid: user.userid }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await client.close();
    }
});

// User registration
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        await client.connect();
        const db = client.db('test');
        const usersCollection = db.collection('users');

        // Check if username already exists
        const existingUser = await usersCollection.findOne({ name: username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const result = await usersCollection.insertOne({
            userid: new Date().getTime(), // Generate unique userid
            name: username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully", userId: result.insertedId });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await client.close();
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});