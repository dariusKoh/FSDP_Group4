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
    const [projects, setProjects] = useState([]);
    const [activeState, setActiveState] = useState(null);
    const [currentProject, setCurrentProject] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [testCases, setTestCases] = useState([]);
    const [testLogs, setTestLogs] = useState([]);
    const [projectId, setProjectId] = useState(null);
    const [showCreateProject, setShowCreateProject] = useState(null);

    // Handle running test cases
    const handleRunCases = async () => {
        if (!projectId) {
            console.error("No project selected.");
            return;
        }

        setIsLoading(true);
        setActiveState("Run Cases");

        try {
            const response = await fetch("http://localhost:3001/run-tests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ projectId }),
            });

            if (!response.ok) {
                console.error("Error running tests");
                setIsLoading(false);
                return;
            }

            console.log("Tests started, waiting for completion...");
            await fetchLogsFromDB();
        } catch (error) {
            console.error("Failed to run tests:", error);
            setIsLoading(false);
        }
    };

    // Function to fetch logs from the DB
    const fetchLogsFromDB = async () => {
        if (!projectId) {
            console.warn("fetchLogsFromDB called with null projectId!");
            return;
        }

        console.log("Fetching logs for projectId:", projectId);
        try {
            const response = await fetch("http://localhost:3001/get-logs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ projectId }), // Sending projectId in the body
            });

            const logsData = await response.json();
            setTestLogs(logsData);
        } catch (error) {
            console.error("Failed to fetch logs:", error);
        }
    };

    // Function to fetch test cases when "View Cases" is active
    const fetchTestCases = async () => {
        try {
            const response = await fetch("http://localhost:3001/get-scripts");
            const data = await response.json();
            setTestCases(data);
        } catch (error) {
            console.error("Error fetching test cases:", error);
        }
    };

    // Trigger log fetching only when projectId is updated
    useEffect(() => {
        if (projectId && activeState !== "Help" && activeState !== "Documentation") {
            console.log("useEffect triggered: Fetching logs for projectId:", projectId);
            fetchLogsFromDB();
        }
    }, [projectId]); // Runs only when projectId changes

    // Determine which component to render based on active state
    const renderComponent = () => {
        switch (activeState) {
            case "Project Home":
            case null:
                return (
                    <ProjectHome
                        projects={projects}
                        setCurrentProject={setCurrentProject}
                        setActiveState={setActiveState}
                        setProjectId={setProjectId}
                        projectId={projectId}
                        updateActiveState={updateActiveState}
                    />
                );
            case "View Cases":
                return <ViewCases cases={testCases} projName={currentProject} />;
            case "Help":
                return <Help />;
            case "Documentation":
                return <Docs />;
            default:
                if (isLoading) {
                    return <LoadingScreen logs={testLogs} />;
                }
                return (
                    <Overview
                        testLogs={testLogs}
                        projName={currentProject}
                        projectId={projectId}
                        onClose={() => setActiveState(null)}
                    />
                );
        }
    };

    // Update active state while ensuring projectId is set first
    const updateActiveState = (val, newProjectId = null) => {
        if (newProjectId) {
            setProjectId(newProjectId);
        }

        if (val === "Run Cases") {
            handleRunCases();
        } else {
            setActiveState(val);
            if (val === "View Cases") {
                fetchTestCases();
            }
        }
    };

    const handleAddProject = (projectName) => {
        setProjects((prevProjects) => [...prevProjects, projectName]);
    };

    return (
        <Fragment>
            <NavbarLoggedIn />
            <Sidebar
                base={false} // Modify as per requirement
                setActiveState={updateActiveState}
                projectName={currentProject}
                onProjectOpened={!!currentProject}
                projectId={projectId}
            />
            {renderComponent()}
            {showCreateProject && (
                <CreateProject
                    projCount={projects.length + 1}
                    onClose={() => {
                        setShowCreateProject(false);
                        setCurrentProject(null);
                    }}
                    onAddProject={handleAddProject}
                />
            )}
            <button onClick={() => setShowCreateProject(true)}>Add New Project</button>
        </Fragment>
    );
}
