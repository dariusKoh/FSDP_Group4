import React, { useState, useEffect } from "react";
import "./runCases.css";

export default function RunCases({ proj_id, onClose, onRun }) {
	const [numContainers, setNumContainers] = useState(1);
	const [testFiles, setTestFiles] = useState([]);
	const [selectedTests, setSelectedTests] = useState([]);

	useEffect(() => {
		const fetchTestFiles = async () => {
			try {
				const response = await fetch(
					`http://localhost:3001/get-test-files?proj_id=${proj_id}`
				);
				if (!response.ok) throw new Error("Failed to fetch test files");
				const data = await response.json();
				setTestFiles(data.files || []);
			} catch (error) {
				console.error("Error:", error.message);
				// Consider adding error state handling here
			}
		};

		fetchTestFiles();
	}, [proj_id]);

	const handleCheckboxChange = (testFile) => {
		setSelectedTests((prev) =>
			prev.includes(testFile)
				? prev.filter((f) => f !== testFile)
				: [...prev, testFile]
		);
	};

	const handleRunClick = () => {
		if (selectedTests.length === 0) {
			alert("Please select at least one test file to run.");
			return;
		}
		onRun(numContainers, selectedTests);
	};

	return (
		<>
			<div className="run-cases-overlay" onClick={onClose} />
			<div className="run-cases-popup">
				<h2>Run Test Cases</h2>

				<div className="input-group">
					<label>Number of Containers:</label>
					<input
						type="number"
						min="1"
						value={numContainers}
						onChange={(e) =>
							setNumContainers(Math.max(1, e.target.value))
						}
					/>
				</div>

				<div className="test-selection">
					<h3>Select Tests to Run:</h3>
					<div className="test-checkboxes">
						{testFiles.map((testFile) => (
							<label key={testFile}>
								<input
									type="checkbox"
									checked={selectedTests.includes(testFile)}
									onChange={() =>
										handleCheckboxChange(testFile)
									}
								/>
								<span className="filename">{testFile}</span>
							</label>
						))}
					</div>
				</div>

				<div className="buttons">
					<button className="run-btn" onClick={handleRunClick}>
						Run Tests
					</button>
					<button className="cancel-btn" onClick={onClose}>
						Cancel
					</button>
				</div>
			</div>
		</>
	);
}
