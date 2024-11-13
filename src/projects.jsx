import React, { Fragment, useState } from "react";
import NavbarLoggedIn from "./Components/NavBar/NavbarLoggedIn";
import Sidebar from "./Components/Sidebar/Sidebar";
import Overview from "./Components/ProjectOverview/overview";
import ProjectHome from "./Components/Projects/Projects-Home/project-home";
import LoadingScreen from "./Components/Runtime/loading";
import CreateProject from "./Components/Projects/create-project"; // Import CreateProject component
import ViewCases from "./Components/Viewcase/View-Cases";

export default function ProjectPage() {
    const [projects, setProjects] = useState(["Proj#1", "HahaTest", "random proj", "kanatan", 'yes', 'et cetra', 'corn', 'yaasdasd']);
    const [activeState, setActiveState] = useState(null);
    const [showCreateProject, setShowCreateProject] = useState(false);
    const [currentProject, setCurrentProject ] = useState(null);

    function handleAddProject(projectName) {
        setProjects((prevProjects) => [...prevProjects, projectName]);
    };

    const renderComponent = () => {
        switch (activeState) {
            case "Project Overview":
                return <Overview projName={currentProject} onClose={() => {
                    setCurrentProject(null);
                    setActiveState("Project Home");
                }}/>;
            case "View Cases":
                return <ViewCases projName={currentProject}/>
            case "Run Cases":
                return <LoadingScreen />;
            case "Project Home":
            case "Project Name":
            case "My Projects":
            case "Shared With You":
            case "All Projects":
                return <ProjectHome projects={projects} setCurrentProject={setCurrentProject}/>;
            default:
                return <ProjectHome projects={projects} setCurrentProject={setCurrentProject}/>;
        }
    };
    
    const updateActiveState = (val) => {
        console.log(val)
        setActiveState(val);
    }

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
                    onAddProject={handleAddProject} // Ensure handleAddProject is passed as onAddProject
                />
            )}

            <button onClick={() => setShowCreateProject(true)}>Add New Project</button>
        </Fragment>
    );
}
