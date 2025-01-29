const { MongoClient } = require("mongodb");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const uri =
	"mongodb+srv://teoyuanmao20:Password1234@cluster1.kv3es.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"; // Replace with your MongoDB URI
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(constants.MONGO_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function exportToPDF() {
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
		const usersCollection = db.collection("users");
		const testResultsCollection = db.collection("test_results");

		// Function to get user by name
		async function getUserByName(name) {
			try {
				const user = await usersCollection.findOne(
					{ name },
					{ projection: { _id: 0, userid: 1, name: 1 } }
				);
				return user;
			} catch (error) {
				console.log(error);
			}
		}

		// Get the current user
		const username = "teoym";
		const user = await getUserByName(username);
		if (!user) {
			console.log("User not found");
			return;
		}

		const count = await testResultsCollection.countDocuments({
			userid: user.userid,
		});
		console.log(`Current document count for user ${username}: ${count}`);

		// Fetch data from MongoDB
		const data = await collection.find({}).toArray();

		// Create a new PDF document
		const pdfDoc = new PDFDocument();
		const outputPath = "output.pdf";

		// Write PDF to a file
		pdfDoc.pipe(fs.createWriteStream(outputPath));

		// Add content to the PDF
		pdfDoc.fontSize(20).text("MongoDB Data Export", { align: "center" });
		pdfDoc.moveDown();

		data.forEach((item, index) => {
			pdfDoc.fontSize(12).text(`Record ${index + 1}:`);
			Object.keys(item).forEach((key) => {
				pdfDoc.text(`${key}: ${item[key]}`);
			});
			pdfDoc.moveDown();
		});

		// Finalize the PDF
		pdfDoc.end();
		console.log(`PDF created successfully at ${outputPath}`);
	} catch (err) {
		console.error("Error:", err);
	} finally {
		await client.close();
		console.log("Disconnected from MongoDB");
	}
}

exportToPDF();
