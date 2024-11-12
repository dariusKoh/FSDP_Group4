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

    // Debugging: Log to ensure setActiveState exists
    console.log("ProjectPage: setActiveState function exists:", typeof setActiveState === 'function');

    const renderComponent = () => {
        switch (activeState) {
            case "View Cases":
                return <ProjectHome projects={projects} />;
            case "Run Cases":
                return <LoadingScreen />;
            case "Project Home":
                return <Overview />;
            default:
                return null;
        }
    };

    return (
        <Fragment>
            {/* Conditionally render the Navbar based on login state */}
            {<NavbarLoggedIn />}
            {/* Pass setActiveState to Sidebar */}
            <Sidebar setActiveState={setActiveState} base={true}/>
            {renderComponent()}
        </Fragment>
    );
}
