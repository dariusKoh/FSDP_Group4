import React, { useState, useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import Typed from "typed.js";
import "./overview.css";

function Overview({ testLogs, proj_id, projName, lastDate = "11/12/2024", onClose}) {
    const [filter, setFilter] = useState("All");
    const [searchInput, setSearchInput] = useState(""); // State for the search input
    const [testLogs, setTestLogs] = useState([]);
    const [searchResult, setSearchResult] = useState(null); // State for search results
    // const [testLogs, setTestLogs] = useState([]);
    const el = useRef(null);

    // Fetch logs from MongoDB when the component mounts

    useEffect(() => {
        // fetchLogsFromDB(); // Call the function
    
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
    }, [projName, proj_id]); // Also trigger when proj_id changes
    

    const passed = testLogs.filter(test => test.status === "PASSED");
    const failed = testLogs.filter(test => test.status !== "PASSED");
    const data = {
        totalTasks: testLogs.length,
        passedTasks: passed.length,
        failedTasks: failed.length,
        pendingTasks: testLogs.length - passed.length - failed.length,
    };

    const createChartData = (value) => ({
        series: [value],
        options: {
            chart: { height: 350, type: "radialBar" },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 225,
                    hollow: { size: "70%" },
                    track: { background: "#e0e0e0", strokeWidth: "100%" },
                    dataLabels: {
                        show: true,
                        value: {
                            formatter: (val) => parseInt(val),
                            color: "#111",
                            fontSize: "36px",
                            show: true,
                        },
                    },
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    type: "horizontal",
                    shadeIntensity: 0.5,
                    gradientToColors: ["#ABE5A1"],
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                },
            },
            stroke: { lineCap: "round" },
            labels: ["Percent"],
        },
    });

    const getStatusClass = (status) => {
        if (status === "Pass") return "passed";
        if (status === "Fail") return "failed";
        return "pending";
    };

    // Function to fetch logs from the backend
    // const fetchLogsFromDB = async () => {
    //     console.log("Project ID: "+proj_id)
    //     try {
    //         const response = await fetch('http://localhost:3001/get-logs', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ proj_id: proj_id }), // Sending proj_id in the body
    //         });
    //         console.log(proj_id)
    //         const logsData = await response.json();
    //         setTestLogs(logsData);
    //     } catch (error) {
    //         console.error("Failed to fetch logs:", error);
    //     }
    // };
    

    // Search for specific case by caseId
    const searchByCaseId = async () => {
        if (!searchInput) return; // Do nothing if the search input is empty
        try {
            const response = await fetch(`http://localhost:3001/get-log-by-id/${searchInput}`);
            if (response.ok) {
                const result = await response.json();
                setSearchResult(result); // Set the search result
            } else {
                setSearchResult(null); // Clear the search result if not found
                console.error("Case not found");
            }
        } catch (error) {
            console.error("Failed to search for case:", error);
        }
    };

    const filteredLogs = filter === "All" ? testLogs : testLogs.filter(log => log.status === filter);

    console.log("testLogs data:", testLogs);

    return (
        <div className="overview-container">
            <button onClick={onClose} className="returnBtn" id="backProj">Close</button>
            <span className="mainHead Title" ref={el} />
            <h2 className="Title">
                <span>Last Edited: {lastDate}</span>
            </h2>
            <div className="overview-summary">
                <div className="tasks-overview">
                    <h1 className="task-overview-header">Overview</h1>
                    <h1>{data.passedTasks}</h1>
                    <p>out of {data.totalTasks} tasks Passed</p>
                    <h1>{data.failedTasks}</h1>
                    <p>out of {data.totalTasks} tasks Failed</p>
                    <h1>{data.pendingTasks}</h1>
                    <p>out of {data.totalTasks} tasks Pending</p>
                </div>
                <div className="chart-container">
                    <div className="radial-chart">
                        <div className={`chart-status ${getStatusClass("Pass")}`}>Passed</div>
                        <ReactApexChart
                            options={createChartData((data.passedTasks / data.totalTasks) * 100).options}
                            series={createChartData((data.passedTasks / data.totalTasks) * 100).series}
                            type="radialBar"
                            height={350}
                        />
                    </div>
                    <div className="radial-chart">
                        <div className={`chart-status ${getStatusClass("Fail")}`}>Failed</div>
                        <ReactApexChart
                            options={createChartData((data.failedTasks / data.totalTasks) * 100).options}
                            series={createChartData((data.failedTasks / data.totalTasks) * 100).series}
                            type="radialBar"
                            height={350}
                        />
                    </div>
                    <div className="radial-chart">
                        <div className={`chart-status ${getStatusClass("Pending")}`}>Pending</div>
                        <ReactApexChart
                            options={createChartData((data.pendingTasks / data.totalTasks) * 100).options}
                            series={createChartData((data.pendingTasks / data.totalTasks) * 100).series}
                            type="radialBar"
                            height={350}
                        />
                    </div>
                </div>
            </div>

            <div className="test-table">
                <h3>Search Test Case</h3>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Enter Case ID"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button onClick={searchByCaseId}>Search</button>
                </div>
                {searchResult ? (
                    <div className="search-result">
                        <h3>Search Result</h3>
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
                                <tr className={searchResult.status === "PASSED" ? "pass" : "fail"}>
                                    <td>{searchResult.ancestorTitles + " > " + searchResult.fullTitle}</td>
                                    <td>{searchResult.testId}</td>
                                    <td>{searchResult.status}</td>
                                    <td>{searchResult.duration}</td>
                                    <td>{searchResult.failureMessages}</td>
                                    <td>{new Date(searchResult.createdAt).toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No search results found</p>
                )}
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
                                <td>{log.ancestorTitles + " > " + log.fullTitle}</td>
                                <td>{log.testId}</td>
                                <td>{log.status}</td>
                                <td>{log.duration}</td>
                                <td>{log.failureMessages[0]?.slice(0, 50) || "N/A"}...</td>
                                <td>
                                    {Array.isArray(log.failureMessages) && log.failureMessages.length > 0
                                        ? log.failureMessages[0].length > 30
                                            ? `${log.failureMessages[0].slice(0, 50)}...`
                                            : log.failureMessages[0]
                                        : "No Errors"}
                                </td>
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