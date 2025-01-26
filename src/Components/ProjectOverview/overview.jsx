import React, { useState, useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import Typed from "typed.js";
import "./overview.css";

function Overview({ projName = "No Project", projId = "No ID", lastDate = "11/12/2024", onClose }) {
    const [filter, setFilter] = useState("All");
    const [testLogs, setTestLogs] = useState([]);
    const el = useRef(null);

    useEffect(() => {
        fetchLogsFromDB();
    }, []);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["Yes", " Overview"],
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

    const fetchLogsFromDB = async () => {
        try {
            const response = await fetch("http://localhost:3001/get-logs");
            const logsData = await response.json();
            setTestLogs(logsData);
        } catch (error) {
            console.error("Failed to fetch logs:", error);
        }
    };

    let passed = testLogs.filter((test) => test.status === "PASSED");
    let failed = testLogs.filter((test) => test.status !== "PASSED");
    const data = {
        totalTasks: testLogs.length,
        passedTasks: passed.length,
        failedTasks: failed.length,
        pendingTasks: testLogs.length - passed.length - failed.length,
    };

    const createChartData = (value) => ({
        series: [value],
        options: {
            chart: {
                height: 350,
                type: "radialBar",
            },
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

    const filteredLogs = filter === "All" ? testLogs : testLogs.filter((log) => log.status === filter);

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
                                <td>{log.failureMessages[0]?.slice(0, 50)}...</td>
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
