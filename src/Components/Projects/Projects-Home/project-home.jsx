import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import MyProjects from "./my-projects";
import './project-home.css';

export default function ProjectHome({ projects }) {
    const el = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["Projects", "Projects Home"],
            startDelay: 300,
            typeSpeed: 100,
            backSpeed: 150,
            backDelay: 200,
            loop: false,
            showCursor: false
        });
        return () => {
            typed.destroy(); // Clean up Typed instance
        };
    }, []);

    const handleProjectSelect = (projectName) => {
        setSelectedProject(projectName);
    };

    // Example shared projects (replace with data from API as needed)
    const sharedProjects = [];
    const allProjects = [...projects, ...sharedProjects];

    return (
        <section className="projectHome">
            {/* Pass selectedProject state and onProjectSelect handler to Sidebar */}
            <span className="mainHead" ref={el} />
            <MyProjects 
                projects={projects} 
                add={true} 
                title="My Projects" 
                desc="View your projects here."
                onProjectSelect={handleProjectSelect} 
            />
            <div className="divider"></div>
            <MyProjects 
                projects={sharedProjects} 
                add={false} 
                title="Shared With You" 
                desc="Projects shared with you."
                onProjectSelect={handleProjectSelect}
            />
            <div className="divider"></div>
            <MyProjects 
                projects={allProjects} 
                add={true} 
                title="All Projects" 
                desc="Every project you ever had."
                onProjectSelect={handleProjectSelect}
            />
        </section>
    );
}
