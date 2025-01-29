const { MongoClient, ServerApiVersion, Int32 } = require("mongodb");
const bcrypt = require("bcrypt");
const uri =
	"mongodb+srv://teoyuanmao20:Password1234@cluster1.kv3es.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

// Define user schema
const userSchema = {
	userid: {
		type: Int32,
		required: true,
	},
	name: {
		type: String,
		required: true,
		maxLength: 30,
	},
	password: {
		type: String,
		required: true,
	},
};

async function run() {
	try {
		// Connect the client to the server (optional starting in v4.7)
		await client.connect();
		// Send a ping to confirm a successful connection
		await client.db("admin").command({ ping: 1 });
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!"
		);

		// Define collection and database
		const db = client.db();
		const collection = db.collection("users");

		// Function to add user
		async function addUser(data) {
			try {
				const hashedPassword = await bcrypt.hash(data.password, 10);
				const userid = await getNewUserId(); // Generate new userid
				const user = {
					userid,
					name: data.name,
					password: hashedPassword,
				};
				const result = await collection.insertOne(user);
				return result;
			} catch (error) {
				console.log(error);
			}
		}

		// Function to get user by name
		async function getUserByName(name) {
			try {
				const user = await collection.findOne({ name });
				return user;
			} catch (error) {
				console.log(error);
			}
		}

		// Function to get new userid
		async function getNewUserId() {
			try {
				const usersCount = await collection.countDocuments();
				return usersCount + 1;
			} catch (error) {
				console.log(error);
			}
		}

		// Example usage
		const userData = {
			name: "JunHao",
			password: "password123",
		};
		const result = await addUser(userData);
		console.log(`Inserted user with ID: ${result.insertedId}`);

		const user = await getUserByName(userData.name);
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
run().catch(console.dir);
