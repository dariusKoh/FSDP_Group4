import React, { Fragment } from "react";
import NavbarLoggedIn from "./Components/NavBar/NavbarLoggedIn";
import Sidebar from "./Components/Sidebar/Sidebar";
import Overview from "./Components/ProjectOverview/overview";
import ProjectHome from "./Components/Projects/Projects-Home/project-home";

export default function ProjectPage() {
    const projects = ["Proj#1", "HahaTest", "random proj", "kanatan", 'yes', 'et cetra', 'corn', 'yaasdasd'];

    return (
        <Fragment>
            <NavbarLoggedIn />
            <Sidebar showSidebar={true} />
            {/* <Overview />  */}
            <ProjectHome projects={projects} />
        </Fragment>
    );
}
