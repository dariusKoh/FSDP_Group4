import React, { useState } from "react";
import "./runCases.css";

export default function RunCases({ proj_id, onClose, onRun }) {
	const [numContainers, setNumContainers] = useState(1);

	const handleRunClick = () => {
		console.log("User selected:", numContainers);
		onRun(numContainers);
	};

	return (
		<>
			<div className="run-cases-overlay" onClick={onClose}></div>
			<div className="run-cases-popup">
				<h2>Run Test Cases</h2>
				<label>Number of Containers:</label>
				<input
					type="number"
					min="1"
					value={numContainers}
					onChange={(e) => setNumContainers(Number(e.target.value))}
				/>
				<div className="buttons">
					<button onClick={handleRunClick}>Run</button>
					<button onClick={onClose}>Cancel</button>
				</div>
			</div>
		</>
	);
}
