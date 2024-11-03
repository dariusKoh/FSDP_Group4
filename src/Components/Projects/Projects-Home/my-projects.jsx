import React from "react";
import { useRouteError } from "react-router-dom";
import './project-home.css';
import { Fragment } from "react";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import BasicExample from "./add-project";
import AddProject from "./add-project";

export default function MyProjects(projects){
    if (projects == null){
        return (
            <>
                <h1>Your Projects</h1>
                <h2 className="myDesc">You currently have no projects!</h2>
                {AddProject(null,null)}
            </>
        )
    }
    else{
        return (
            <>
                <h1>Your Projects</h1>
                <h2 className="myDesc">View your current projects</h2>
                <section className="projContainer">
                    {
                        projects.map((project) => AddProject(project,null,project))
                    }
                </section>
            </>
        )
    }
}