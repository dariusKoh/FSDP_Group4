import React from "react";
import { useRouteError } from "react-router-dom";
import './project-home.css';
import { Fragment } from "react";
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

    return(
        <section className="projectHome">
            <span className="mainHead" ref={el} />
            {MyProjects(projects)}
        </section>
    );
}   