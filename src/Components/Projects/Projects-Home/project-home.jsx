import React from "react";
import { useRouteError } from "react-router-dom";
import './project-home.css';
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import MyProjects from "./my-projects";

export default function ProjectHome(projects){
    const el = useRef(null);
    useEffect(
        ()=>{
            const typed = new Typed(el.current,{
                strings: ["Projects","Projects Home"],
                startDelay: 300,
                typeSpeed: 100,
                backSpeed: 150,
                backDelay: 200,
                loop: false,
                showCursor:false
            });
        },
        []
    );
    // From API get projects, split into projects type
    let sharedProjects = ["MyGuy", "Yes"]
    let allProjects = projects.concat(sharedProjects);
    return(
        <section className="projectHome">
            <span className="mainHead" ref={el} />
            {MyProjects(projects,true,"My Projects","View your projects here.")}
            <div className="divider"></div>
            {MyProjects(sharedProjects,false,"Shared With You","Projects shared with you.")}
            <div className="divider"></div>
            {MyProjects(allProjects,true,"All projects","Every project you every had.")}
        </section>
    );
}   