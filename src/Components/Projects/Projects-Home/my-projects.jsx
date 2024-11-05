import React from "react";
import { useRouteError } from "react-router-dom";
import './project-home.css';
import { useEffect, useRef } from "react";
import AddProject from "../add-project";

export default function MyProjects(projects,add,title,desc){
    const scrollContainerRef =useRef(null);

    useEffect(()=>{
        // Handle horizontal scrolling on mouse wheel
        const handleScroll = (event) => {
            event.preventDefault(); // Prevent vertical scrolling
            scrollContainerRef.current.scrollLeft += event.deltaY; // Scroll horizontally
        };

        // Add wheel event listener to scroll container
        const scrollContainer = scrollContainerRef.current;
        scrollContainer.addEventListener('wheel', handleScroll);

        return()=>{
            scrollContainer.removeEventListener('wheel', handleScroll); // Clean up event listener
        }
    })
    if (projects == null){
        return (
            <>
                <h1>{title}</h1>
                <h2 className="myDesc">You currently have no projects here!</h2>
                {add ? AddProject(null,null) : null}
            </>
        )
    }
    else{
        let len = projects.length;
        return (
            <>
                <h1>{title}</h1>
                <h2 className="myDesc">{desc}</h2>
                <section className="projContainer" ref={scrollContainerRef}>
                    <div className="projList">
                    {
                        projects.map((project) => AddProject(project,null,project,"29/08/2006"))
                    }
                    {
                        add ? AddProject(null,null, len) : null
                    }
                    </div>
                </section>
            </>
        )
    }
}