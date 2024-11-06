import { useRouteError } from "react-router-dom";
import { Fragment } from "react";
import Navbar from "./Components/NavBar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import ProjectHome from "./Components/Projects/Projects-Home/project-home";


export default function ProjectPage() {
    let projects = ["Proj#1", "HahaTest","random proj", "kanatan",'yes','et cetra', 'corn','yaasdasd'];
    return (
        <Fragment>
            <Navbar />
            {Sidebar(true)}
            {ProjectHome(projects)}
        </Fragment>
    )
    
}