import React, { Fragment, useState, useEffect } from "react";
import NavbarLoggedIn from "./Components/NavBar/NavbarLoggedIn";
import Sidebar from "./Components/Sidebar/Sidebar";
import Overview from "./Components/ProjectOverview/overview";
import ProjectHome from "./Components/Projects/Projects-Home/project-home";
import LoadingScreen from "./Components/Runtime/loading";
import CreateProject from "./Components/Projects/create-project";
import ViewCases from "./Components/Viewcase/View-Cases";
import Docs from "./Components/Docs/docs";
import Help from "./Components/Help/help";

export default function ProjectPage() {
    const [projects, setProjects] = useState([
        
    ]);
    const [activeState, setActiveState] = useState(null);
    const [showCreateProject, setShowCreateProject] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [logs, setLogs] = useState("");
    const [testCases, setTestCases] = useState([]); // State to store test cases

    const handleRunCases = async () => {
        setIsLoading(true);
        setActiveState("Run Cases");

        try {
            // Trigger the test run by calling the backend endpoint
            const response = await fetch('http://localhost:3001/run-tests');
            if (!response.ok) {
                console.error("Error running tests");
                setIsLoading(false);
                return;
            }

            console.log("Tests started, waiting for completion...");

            // Poll for logs after a short delay
            setTimeout(fetchLogsFromDB, 5000);
        } catch (error) {
            console.error("Failed to run tests:", error);
            setIsLoading(false);
        }
    };

    // Function to fetch logs from MongoDB
    const fetchLogsFromDB = async () => {
        try {
            const response = await fetch('http://localhost:3001/get-logs');
            const logsData = await response.json();
            const latestLogs = logsData.map(log => log.log).join("\n");
            setLogs(latestLogs);
            setIsLoading(false);
            setActiveState("Project Overview");
        } catch (error) {
            console.error("Failed to fetch logs:", error);
            setIsLoading(false);
        }
    };

    // Function to fetch test cases when "View Cases" is active
    const fetchTestCases = async () => {
        try {
            const response = await fetch('http://localhost:3001/get-scripts');
            const data = await response.json();
            setTestCases(data);
        } catch (error) {
            console.error("Error fetching test cases:", error);
        }
    };
    
    // Determine which component to render
    const renderComponent = () => {
        switch (activeState) {
            case "Project Overview":
                return <Overview projName={currentProject} />;
            case "View Cases":
                return <ViewCases cases={testCases} projName={currentProject} />; // Pass test cases to ViewCases
            case "Help":
                return <Help />
            case "Documentation":
                return <Docs />
            default:
                if (isLoading) {
                    return <LoadingScreen logs={logs} />;
                }
                return <ProjectHome projects={projects} setCurrentProject={setCurrentProject} setActiveState={setActiveState} />;
                
        }
    };

    function handleAddProject(projectName) {
        setProjects((prevProjects) => [...prevProjects, projectName]);
    }

    const updateActiveState = (val) => {
        console.log("updateActiveState called with value:", val); // Added for debugging
        if (val === "Run Cases") {
            handleRunCases();
        } else {
            setActiveState(val);
            if (val === "View Cases") {
                console.log("Fetching test cases..."); // Added for debugging
                fetchTestCases(); // Fetch test cases when "View Cases" is selected
            }
        }
    };
    

    return (
        <Fragment>
            <NavbarLoggedIn />
            <Sidebar
                base={false} //Edits here
                setActiveState={updateActiveState}
                projectName={currentProject}
                onProjectOpened={currentProject !== null} 
            />
            {renderComponent()}
            {showCreateProject && (
                <CreateProject
                    projCount={projects.length + 1}
                    onClose={() => setShowCreateProject(false)}
                    onAddProject={handleAddProject}
                />
            )}
            <button onClick={() => setShowCreateProject(true)}>Add New Project</button>
        </Fragment>
    );
}
