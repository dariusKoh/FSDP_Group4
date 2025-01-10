// projects-home.jsx
import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import MyProjects from "./my-projects";
import './project-home.css';
import Overview from "../../ProjectOverview/overview";

export default function ProjectHome({ setCurrentProject, setActiveState }) {
    const el = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]); // Manage projects state here
    const [currentCategory, setCurrentCategory] = useState("myProjects");

    // Fetch projects from the backend
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:3001/projects'); // Call the new endpoint
                const data = await response.json();
                setProjects(data); // Set the fetched projects into state
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);  // Runs once when component mounts

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["Projects", "Projects Home"],
            startDelay: 300,
            typeSpeed: 100,
            backSpeed: 150,
            backDelay: 200,
            loop: false,
            showCursor: false,
        });

        return () => {
            typed.destroy();
        };
    }, []);

    const handleProjectSelect = (projectName, category) => {
        setSelectedProject(projectName);
        setCurrentCategory(category);
        setCurrentProject(projectName);
        setActiveState(projectName);
    };

    const handleAddNewProject = (newProject) => {
        setProjects([...projects, newProject]);
    };

    const handleCloseProject = () => {
        setSelectedProject(null);
    };

    const sharedProjects = [];
    const allProjects = [...projects, ...sharedProjects];

    return (
        <div>
            {selectedProject ? (
                <Overview projName={selectedProject} lastDate="11/12/2024" onClose={handleCloseProject} />
            ) : (
                <section className="projectHome">
                    <span className="mainHead" ref={el} />
                    <MyProjects
                        projects={projects}
                        add={true}
                        title="My Projects"
                        desc="View your projects here."
                        onProjectSelect={handleProjectSelect}
                        onAddNewProject={handleAddNewProject}
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
            )}
        </div>
    );
}
