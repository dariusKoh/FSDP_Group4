// Config file for .env file to be used in different directories
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

module.exports = {
	GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};
