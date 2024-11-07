import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./overview.css";

const Overview = () => {
    const [filter, setFilter] = useState("All");

    const data = {
        totalTasks: 144,
        passedTasks: 80,
        failedTasks: 20,
        pendingTasks: 44,
    };

    const tests = [
        { name: "Test Home Page", id: "TC_1", status: "Pass", remarks: "No Remarks" },
        { name: "LolTest", id: "TC_2", status: "Fail", remarks: "Remarks" },
    ];

    const filteredTests = filter === "All" ? tests : tests.filter(test => test.status === filter);

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
                    hollow: {
                        size: "70%",
                    },
                    track: {
                        background: "#e0e0e0",
                        strokeWidth: "100%",
                    },
                    dataLabels: {
                        show: true,
                        value: {
                            formatter: function (val) {
                                return parseInt(val);
                            },
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
            stroke: {
                lineCap: "round",
            },
            labels: ["Percent"],
        },
    });

    // Helper function to determine chart status class
    const getStatusClass = (status) => {
        if (status === "Pass") return "passed";
        if (status === "Fail") return "failed";
        return "pending";
    };

    return (
        <div className="overview-container">
            <h2 className="Title">
                Title of Project <span>Last Edited: (Date)</span>
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
                        <div className={`chart-status ${getStatusClass("Pass")}`}>
                            Passed
                        </div>
                        <ReactApexChart
                            options={createChartData((data.passedTasks / data.totalTasks) * 100).options}
                            series={createChartData((data.passedTasks / data.totalTasks) * 100).series}
                            type="radialBar"
                            height={350}
                        />
                    </div>
                    <div className="radial-chart">
                        <div className={`chart-status ${getStatusClass("Fail")}`}>
                            Failed
                        </div>
                        <ReactApexChart
                            options={createChartData((data.failedTasks / data.totalTasks) * 100).options}
                            series={createChartData((data.failedTasks / data.totalTasks) * 100).series}
                            type="radialBar"
                            height={350}
                        />
                    </div>
                    <div className="radial-chart">
                        <div className={`chart-status ${getStatusClass("Pending")}`}>
                            Pending
                        </div>
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
                <h3>View Past Tests</h3>
                <div className="filter">
                    <label htmlFor="filter">Filter by:</label>
                    <select id="filter" onChange={(e) => setFilter(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Pass">Passed</option>
                        <option value="Fail">Failed</option>
                    </select>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Test Case Name</th>
                            <th>ID</th>
                            <th>Pass / Fail</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTests.map((test, index) => (
                            <tr key={index} className={test.status === "Pass" ? "pass" : "fail"}>
                                <td>{test.name}</td>
                                <td>{test.id}</td>
                                <td>{test.status}</td>
                                <td>{test.remarks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Overview;
