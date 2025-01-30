const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("../config");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function summuriseFailureMessages(testResults) {
	console.log("Summarising failure messages...");
	try {
		// Prompt for the AI model to generate and format summaries of failed test cases
		var prompt = `As a QA automation expert analyzing banking application test results, create a technical summary of each failed test case. Your summary should include:  
1. **Detailed Failure Description:** Clearly describe what caused the failure, providing specific details such as expected vs. actual results, the conditions under which the failure occurred, and the relevant component or module.  
2. **Recommendation for Improvement:** Offer detailed and actionable recommendations to resolve the issue, ensuring clarity for the developer or QA team.  
3. **Root Cause Analysis:** Identify potential root causes or patterns that could explain the failure, referencing specific parts of the code, test logic, or system behavior.  

### Formatting Instructions:  
- Your response should be a single string with the following format:  
- Enclose each failed test case summary in double quotes (\`"\`).  
- Separate summaries of failed test cases with the delimiter \`&;*\`.  
- If a test case passed, include only the delimiter \`&;*\`, with no text, to indicate no summary is needed.  
- Ensure the position/order of test cases in the input matches the output.  

### Example Response:  
If four test cases are provided and test cases 1, 2, and 4 failed while test case 3 passed, the response should be:  
\`"The test case failed because...\nRecommendation:...\nRoot Cause:..."&;*"The test case failed because ..."&;*&;*"The test case failed because ..."\`  

### Key Notes:  
- Only include the formatted summary for **all test cases**.  
- Additional information or context can be included in the failure description, recommendation, or root cause analysis, or in another section if deemed suitable.
- Do not add additional formatting or special characters to the response, or other data that was parsed in such as test case ids, names or statuses. 
- Ensure that failure descriptions, recommendations, and root cause analysis are detailed and actionable.  

### Test Results:`;

		// Parse test results
		const results = testResults.map((test) => {
			const ancestorTitles = test.ancestorTitles.join(" > "); // Join ancestor titles to create a hierarchy
			const fullTitle = test.fullName;
			const duration = test.duration;
			const status = test.status.toUpperCase();
			const failureMessages =
				test.failureMessages.length === 0
					? "None"
					: test.failureMessages.join("\n"); // Join failure messages if any
			const failureDetails =
				test.failureDetails.length === 0
					? "None"
					: test.failureDetails
							.map((detail) => detail.message)
							.join("\n");

			return {
				ancestorTitles,
				fullTitle,
				duration,
				status,
				failureMessages,
				failureDetails,
			};
		});

		// Update prompt with all test results to be summaried
		for (const item of results) {
			prompt += `\n\n
                Test name: ${item.ancestorTitles}\n
                Status: ${item.status}\n
                Duration: ${item.duration}ms\n
                Failure messages: ${item.failureMessages}\n
                Failure details: ${item.failureDetails}`;
			console.log(`${item.ancestorTitles}: ${item.failureMessages}\n`);
		}
		const result = await model.generateContent(prompt); // Generate summaries using Gemini AI model

		// Parse and format summaries
		const summaries = result.response
			.text()
			.split("&;*")
			.map((summary, index) => ({
				testId: index + 1,
				summary: summary == "" ? "" : summary.trim(),
			}));

		// Log summaries
		// console.log("\n\n\nSummaries:");
		// summaries.forEach((summary) => {
		// 	console.log(`Test ${summary.testId}:`);
		// 	console.log(`Summary: ${summary.summary}`);
		// 	console.log("-------------------");
		// });

		// Return summaries
		return {
			success: true,
			summaries,
		};
	} catch (error) {
		console.error(`Error requesting prompt: ${error.message}`);
	}
}

module.exports = {
	summuriseFailureMessages,
};
