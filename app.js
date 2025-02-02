const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Optional, for token-based authentication

const SECRET_KEY = "your_secret_key"; // Replace with a secure key for JWT

const {
	runTestInContainers,
	runTestsOnLocalRepo,
	getTestFiles,
} = require("./scripts/run-tests"); // Import runTests
const dbQuery = require("./scripts/query-db"); // Import databse query script
const { pushScripts } = require("./scripts/push-scripts"); // Import pushScripts
const { run } = require("jest");
const { generatePDF } = require("./scripts/exportToPDF");

const app = express();
const port = 3001;
const constants = {
	MONGO_URI:
		"mongodb+srv://teoyuanmao20:Password1234@cluster1.kv3es.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1",
};
const client = new MongoClient(constants.MONGO_URI);

app.use(cors());
app.use(express.json());

// API to trigger test run
app.post("/run-tests", async (req, res) => {
	const { proj_id, username, numContainers, selectedTests } = req.body;
	console.log(numContainers, selectedTests);
	try {
		await runTestInContainers(
			proj_id,
			username,
			numContainers,
			selectedTests
		); // Assuming req.user.id contains the logged-in user ID
		res.status(200).json({
			message: "Tests started successfully and completed",
		});
	} catch (error) {
		console.error("Error running tests:", error);
		res.status(500).json({ error: "Failed to run tests" });
	}
});

// Webhook for CICD
app.post("/webhook", async (req, res) => {
	const { branch, commit } = req.body;
	console.log(`Webhook triggered for branch: ${branch}`);
	console.log(`Commit hash: ${commit}`);

	try {
		// Here, we can perform a git pull or any necessary setup before running tests.
		console.log("Pulling the latest changes...");
		console.log("Running tests...");
		await runTestsOnLocalRepo(); // Call the function to run the tests inside Docker containers
		// Send back a successful response
		res.status(200).json({ message: "Tests started successfully" });
	} catch (error) {
		console.error("Failed to run tests:", error);
		res.status(500).json({ error: "Failed to start tests" });
	}
});

app.post("/export-pdf", async (req, res) => {
	try {
		const { proj_id } = req.body;
		const logs = await dbQuery.queryDataByproj_id("test_results", proj_id); // Call queryDataByProjectId
		if (!Array.isArray(logs)) {
			console.error("Unexpected response format:", logs);
			return;
		}

		await generatePDF(res, logs);
		console.log("PDF generated successfully");
	} catch (error) {
		console.error("Error fetching test files:", error);
	}
});

app.get("/get-test-files", async (req, res) => {
	try {
		const data = await getTestFiles();
		res.json({ files: data });
	} catch (error) {
		console.error("Error fetching test files:", error);
	}
});

app.post("/create-project", async (req, res) => {
	const { projectName, visibility, ownerid, files } = req.body;
	try {
		await client.connect();
		const db = client.db("test");
		const projectsCollection = db.collection("projects");
		const scriptsCollection = db.collection("scripts");

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
		const scriptDocuments = files.map((file) => ({
			proj_id: newProjectId,
			scriptName: file.name,
			scriptContent: file.content,
			createdAt: new Date(),
		}));
		await scriptsCollection.insertMany(scriptDocuments);

		res.status(201).json({
			message: "Project created successfully",
			project: newProject,
		});
	} catch (error) {
		console.error("Error creating project:", error);
		res.status(500).json({ error: "Failed to create project" });
	} finally {
		await client.close();
	}
});

// API to fetch test logs from MongoDB
app.post("/get-logs", async (req, res) => {
	const { proj_id } = req.body;
	try {
		const logs = await dbQuery.queryDataByproj_id("test_results", proj_id); // Call queryDataByProjectId
		res.json(logs);
	} catch (error) {
		console.error("Error fetching logs from MongoDB:", error);
		res.status(500).json({ error: "Failed to fetch logs" });
	} finally {
		await client.close();
	}
});

app.get("/get-log-by-id/:id", async (req, res) => {
	try {
		const { id } = req.params;
		console.log("Requested ID:", id);

		await client.connect();
		const db = client.db("test");
		const log = await db.collection("test_results").findOne({ testId: id });

		console.log("Database Query Result:", log); // Debugging log

		if (!log) {
			console.log("No test case found for ID:", id);
			return res.status(404).json({ message: "Test case not found" });
		}

		res.json(log);
	} catch (error) {
		console.error("Error fetching log by ID:", error);
		res.status(500).json({ error: "Internal Server Error" });
	} finally {
		await client.close();
	}
});

// API to fetch all projects
app.get("/projects", async (req, res) => {
	const user_id = req.headers["user-id"]; // Get user_id from request headers

	if (!user_id) {
		return res.status(400).json({ error: "Missing user ID" });
	}

	try {
		await client.connect();
		const db = client.db("test");
		const collection = db.collection("projects");
		// Fetch projects only for the logged-in user
		const projects = await collection
			.find({ owner_id: parseInt(user_id) })
			.toArray();
		res.status(200).json(projects);
	} catch (error) {
		console.error("Error fetching projects:", error);
		res.status(500).json({ error: "Failed to fetch projects" });
	} finally {
		await client.close();
	}
});

// API to fetch project details by projectName
app.get("/projects/:projectName", async (req, res) => {
	const { projectName } = req.params;

	try {
		await client.connect();
		const db = client.db("test");
		const projectsCollection = db.collection("projects");

		// Find the project by projectName
		const project = await projectsCollection.findOne({ projectName });
		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}

		res.status(200).json(project);
	} catch (error) {
		console.error("Error fetching project details:", error);
		res.status(500).json({ error: "Failed to fetch project details" });
	} finally {
		await client.close();
	}
});

// API to fetch test cases from MongoDB
app.post("/get-scripts", async (req, res) => {
	try {
		const { proj_id } = req.body;

		if (!proj_id) {
			return res.status(400).json({ error: "Missing proj_id" });
		}

		const scripts = await dbQuery.queryDataByproj_id("scripts", proj_id);
		res.json(scripts);
	} catch (error) {
		console.error("Error fetching test cases from MongoDB:", error);
		res.status(500).send("Failed to fetch test cases");
	} finally {
		await client.close();
	}
});

// User login
app.post("/api/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		await client.connect();
		const db = client.db("test");
		const usersCollection = db.collection("users");

		// Find user by username
		const user = await usersCollection.findOne({ username: username });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Check password
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(401).json({ message: "Invalid password" });
		}

		// Generate token (optional)
		const token = jwt.sign({ userid: user.userid }, SECRET_KEY, {
			expiresIn: "1h",
		});

		res.status(200).json({
			message: "Login successful",
			token,
			userid: user.userid,
			role: user.role,
		});
	} catch (error) {
		console.error("Error during login:", error);
		res.status(500).json({ error: "Internal server error" });
	} finally {
		await client.close();
	}
});

// User registration
app.post("/api/register", async (req, res) => {
	const { username, email, password, role } = req.body;

	try {
		await client.connect();
		const db = client.db("test");
		const usersCollection = db.collection("users");

		// Check if username already exists
		const existingUser = await usersCollection.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: "Username already exists" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Insert new user
		const result = await usersCollection.insertOne({
			userid: new Date().getTime(), // Generate unique userid
			username,
			email,
			password: hashedPassword,
			role, // Assign role to user
		});

		res.status(201).json({
			message: "User registered successfully",
			userId: result.insertedId,
		});
	} catch (error) {
		console.error("Error during registration:", error);
		res.status(500).json({ error: "Internal server error" });
	} finally {
		await client.close();
	}
});

// API to delete project
app.post("/delete-project", async (req, res) => {
	try {
		const { project } = req.body;

		if (!project || !project.proj_id) {
			console.error("Invalid project data");
			return res.status(400).json({ error: "Invalid project data" });
		}

		await client.connect();
		console.log("Connected to MongoDB");

		const db = client.db("test");
		console.log("Selected database");

		const projectsCollection = db.collection("projects");
		const scriptsCollection = db.collection("scripts");
		const testResultsCollection = db.collection("test_results");

		console.log("Deleting project");
		const projectDeleteResult = await projectsCollection.deleteOne({
			proj_id: project.proj_id,
		});
		console.log("Project deleted:", projectDeleteResult);

		console.log("Deleting associated scripts");
		const scriptDeleteResult = await scriptsCollection.deleteMany({
			proj_id: project.proj_id,
		});
		console.log("Scripts deleted:", scriptDeleteResult);

		console.log("Deleting associated test results");
		const testResultDeleteResult = await testResultsCollection.deleteMany({
			proj_id: project.proj_id,
		});
		console.log("Test results deleted:", testResultDeleteResult);

		res.status(200).json({ message: "Project deleted successfully" });
	} catch (error) {
		console.error("Error deleting project:", error);
		res.status(500).json({ error: "Internal Server Error" });
	} finally {
		try {
			await client.close();
			console.log("Disconnected from MongoDB");
		} catch (error) {
			console.error("Error closing MongoDB connection:", error);
		}
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
