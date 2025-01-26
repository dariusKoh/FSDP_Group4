import React, { Fragment, useState } from "react";
import NavbarLoggedIn from "./Components/NavBar/NavbarLoggedIn";
import Sidebar from "./Components/Sidebar/Sidebar";
import ProjectHome from "./Components/Projects/Projects-Home/project-home";
import Overview from "./Components/ProjectOverview/overview";
import CreateProject from "./Components/Projects/create-project";

export default function ProjectPage() {
    const [currentProject, setCurrentProject] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeState, setActiveState] = useState("Project Home");
    const [showCreateProject, setShowCreateProject] = useState(false);

    // const handleProjectSelect = (project) => {
    //     setCurrentProject(project);
    //     setActiveState("Project Overview");
    // };

    const renderComponent = () => {
        switch (activeState) {
            case "Project Overview":
                console.log("hehe")
                console.log(selectedProject)
                return (
                    <Overview
                        project={selectedProject} // Pass full project
                        onClose={() => setActiveState("Project Home")}
                    />
                );
            case "Project Home":
            default:
                return (
                    <ProjectHome
                        setActiveState={setActiveState}
                        setCurrentProject={setSelectedProject}
                    />
                );
        }
    };

    return (
        <Fragment>
            <NavbarLoggedIn />
            <Sidebar
                currentProject={currentProject} // Pass the current project
                setActiveState={setActiveState}
            />
            {renderComponent()}
            {showCreateProject && (
                <CreateProject
                    onClose={() => setShowCreateProject(false)}
                />
            )}
        </Fragment>
    );
}
