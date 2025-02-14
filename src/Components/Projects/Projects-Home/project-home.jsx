// projects-home.jsx
import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import MyProjects from "./my-projects";
import './project-home.css';
import Overview from "../../ProjectOverview/overview";

export default function ProjectHome({ updateActiveState, proj_id, setproj_id, setCurrentProject, setActiveState }) {
    const el = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]); // Manage projects state here
    const [currentCategory, setCurrentCategory] = useState("myProjects");

    // Fetch projects from the backend
    useEffect(() => {
        const fetchProjects = async () => {
            const user_id = localStorage.getItem("user_id"); // Retrieve user_id from localStorage
            if (!user_id) {
                console.error("User is not authenticated");
                return;
            }
    
            try {
                const response = await fetch('http://localhost:3001/projects', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'User-ID': user_id, // Send user_id in headers
                    },
                });
    
                if (!response.ok) {
                    throw new Error("Failed to fetch projects");
                }
    
                const data = await response.json();
                setProjects(data); // Set the filtered projects
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
    
        fetchProjects();
    }, []);
    

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

    const handleProjectSelect = (project_Id, projectName, category) => {
        setSelectedProject(projectName);
        setCurrentCategory(category);
        setCurrentProject(projectName);
        setproj_id(project_Id); // Store proj_id
        setActiveState(projectName);
        updateActiveState(projectName);
        console.log("Selected Project ID:", project_Id); // Debugging
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
                <Overview proj_id={proj_id} projName={selectedProject} lastDate="11/12/2024" onClose={handleCloseProject} />
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
