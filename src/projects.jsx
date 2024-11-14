import React, { Fragment, useState } from "react";
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
        "Proj#1", "HahaTest", "random proj", "kanatan", 'yes', 'et cetra', 'corn', 'yaasdasd'
    ]);
    const [activeState, setActiveState] = useState(null);
    const [showCreateProject, setShowCreateProject] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Function to run tests by calling the backend
    const handleRunCases = async () => {
        setIsLoading(true);
        setActiveState("Run Cases");

        try {
            // Call the backend to run tests
            const response = await fetch('http://localhost:3001/run-tests');
            if (response.ok) {
                console.log("Tests completed successfully");
                setIsLoading(false);
                setActiveState("Project Overview");
            } else {
                console.error("Error running tests");
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Failed to run tests:", error);
            setIsLoading(false);
        }
    };

    function handleAddProject(projectName) {
        setProjects((prevProjects) => [...prevProjects, projectName]);
    }

    const renderComponent = () => {
        if (isLoading) {
            return <LoadingScreen />;
        }
        switch (activeState) {
            case "Project Overview":
                return (
                    <Overview
                        projName={currentProject}
                        onClose={() => {
                            setCurrentProject(null);
                            setActiveState("Project Home");
                        }}
                    />
                );
            case "View Cases":
                return <ViewCases projName={currentProject} />;
            case "Run Cases":
                return <LoadingScreen />;
            case "Documentation":
                return <Docs />;
            case "Help":
                return <Help />;
            case "Project Home":
                return <ProjectHome projects={projects} setCurrentProject={setCurrentProject} />;
            default:
                return <ProjectHome projects={projects} setCurrentProject={setCurrentProject} />;
        }
    };

    const updateActiveState = (val) => {
        if (val === "Run Cases") {
            handleRunCases();
        } else {
            setActiveState(val);
        }
    };

    return (
        <Fragment>
            <NavbarLoggedIn />
            <Sidebar
                base={true}
                setActiveState={updateActiveState}
                projectName={currentProject}
                onProjectOpened={true}
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
