import { useRouteError } from "react-router-dom";
import './projects.css';
import { Fragment } from "react";
import { useEffect, useRef } from "react";
import Navbar from "./Components/NavBar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import ProjectHome from "./Components/Projects/Projects-Home/project-home";


export default function ProjectPage() {
    let projects = ["Proj#1", "HahaTest"];
    return (
        <Fragment>
            <Navbar />
            <Sidebar />
            {ProjectHome(projects)}
        </Fragment>
    )
    
}