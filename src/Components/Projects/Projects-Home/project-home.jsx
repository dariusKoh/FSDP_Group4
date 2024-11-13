import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import MyProjects from "./my-projects";
import Sidebar from "../../Sidebar/Sidebar"; // Assuming Sidebar is in the same folder
import './project-home.css';
import ViewProject from "../view-projects";

export default function ProjectHome({ projects }) {
    const el = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentCategory, setCurrentCategory] = useState("myProjects");

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

    const handleProjectSelect = (projectName, category) => {
        setSelectedProject(projectName);
        setCurrentCategory(category);  // Track the category of the selected project
    };

    const handleCloseProject = () => {
        setSelectedProject(null);
    };

    const sharedProjects = [];
    const allProjects = [...projects, ...sharedProjects];

    return (
        <section className="projectHome">
            {/* Pass selectedProject state and onProjectSelect handler to Sidebar */}
            <Sidebar 
                isLoggedIn={true} 
                selectedProject={selectedProject} 
                onProjectSelect={handleProjectSelect}
                onProjectOpened={!!selectedProject}  // Set to true if a project is selected
                projectName={selectedProject}       // Pass the selected project name
            />
            <span className="mainHead" ref={el} />
    
            {/* Conditional rendering: Show ViewProject if a project is selected, otherwise show the MyProjects sections */}
            {selectedProject ? (
                // Render only ViewProject if a project is selected
                <ViewProject projectId={selectedProject} onClose={() => setSelectedProject(null)} />
            ) : (
                // Render all MyProjects sections if no project is selected
                <>
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
                </>
            )}
        </section>
    );
    
}
