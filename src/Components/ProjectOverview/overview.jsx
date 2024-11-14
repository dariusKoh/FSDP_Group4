import React, { useState, useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import Typed from "typed.js";
import "./overview.css";

function Overview({ projName, lastDate = "11/12/2024", onClose }) {
    const [filter, setFilter] = useState("All");
    const [testLogs, setTestLogs] = useState([]);
    const el = useRef(null);

    // Fetch logs from MongoDB when the component mounts
    useEffect(() => {
        fetchLogsFromDB();
    }, []);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [projName, projName + " Overview"],
            startDelay: 300,
            typeSpeed: 100,
            backSpeed: 150,
            backDelay: 200,
            loop: false,
            showCursor: false,
        });
        return () => {
            typed.destroy();
        };
    }, [projName]);

    // Function to fetch logs from the backend
    const fetchLogsFromDB = async () => {
        try {
            const response = await fetch('http://localhost:3001/get-logs');
            const logsData = await response.json();
            setTestLogs(logsData);
        } catch (error) {
            console.error("Failed to fetch logs:", error);
        }
    };

    // Filter logs based on status
    const filteredLogs = filter === "All" ? testLogs : testLogs.filter(log => log.status === filter);
    return (
        <div className="overview-container">
            <button onClick={onClose} className="returnBtn" id="backProj">Close</button>
            <span className="mainHead Title" ref={el} />
            <h2 className="Title">
                <span>Last Edited: {lastDate}</span>
            </h2>

            {/* Test Logs Section */}
            <div className="test-table">
                <h3>View Test Logs</h3>
                <div className="filter">
                    <label htmlFor="filter">Filter by:</label>
                    <select id="filter" onChange={(e) => setFilter(e.target.value)}>
                        <option value="All">All</option>
                        <option value="PASSED">Passed</option>
                        <option value="FAILED">Failed</option>
                    </select>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Test Case Name</th>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Duration (ms)</th>
                            <th>Failure Messages</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLogs.map((log, index) => (
                            <tr key={index} className={log.status === "PASSED" ? "pass" : "fail"}>
                                <td>{log.ancestorTitles.join(" > ")}</td>
                                <td>{log.testId}</td>
                                <td>{log.status}</td>
                                <td>{log.duration}</td>
                                <td>{log.failureMessages[0].length > 30 ? `${log.failureMessages[0].slice(0, 50)}...` : log.failureMessages}</td>
                                <td>{new Date(log.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Overview;
