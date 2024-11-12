import React, { Fragment, useState } from "react";
import NavbarLoggedIn from "./Components/NavBar/NavbarLoggedIn";
import Navbar from "./Components/NavBar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Overview from "./Components/ProjectOverview/overview";
import ProjectHome from "./Components/Projects/Projects-Home/project-home";
import LoadingScreen from "./Components/Runtime/loading";

export default function ProjectPage() {
    const projects = ["Proj#1", "HahaTest", "random proj", "kanatan", 'yes', 'et cetra', 'corn', 'yaasdasd'];
    const [activeState, setActiveState] = useState("Project Home");

    // Function to render the appropriate component based on `activeState`
    const renderComponent = () => {
        switch (activeState) {
            case "Project Overview":
                return <Overview />;
            case "Run Cases":
                return <LoadingScreen />;
            case "Project Home":
            case "Project Name":
            case "My Projects":
            case "Shared With You":
            case "All Projects":
                return <ProjectHome projects={projects} />;
            default:
                return <ProjectHome projects={projects} />;
        }
    };

    return (
        <Fragment>
            {<NavbarLoggedIn />}
            <Sidebar base={true} setActiveState={setActiveState} />
            {renderComponent()}
        </Fragment>
    );
}
