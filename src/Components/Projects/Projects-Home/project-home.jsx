import React, { useEffect, useState } from "react";
import MyProjects from "./my-projects";
import Overview from "../../ProjectOverview/overview";
import "./project-home.css";

export default function ProjectHome({
    setActiveState,
    currentProject,
    setCurrentProject,
}) {
    const [projects, setProjects] = useState([]);
    const [sharedProjects, setSharedProjects] = useState([]);

    // Fetch projects for the user
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("http://localhost:3001/projects");
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);


    const allProjects = [...projects, ...sharedProjects];

    return (
        <div className="projectHome">
            {currentProject ? (
                // Show Overview when a project is selected
                <Overview
                    project={currentProject}
                    onClose={() => setCurrentProject(null)}
                />
            ) : (
                <section>
                    <MyProjects
                        projects={projects}
                        title="My Projects"
                        desc="View your projects here."
                    />
                    <div className="divider" />
                    <MyProjects
                        projects={sharedProjects}
                        title="Shared With You"
                        desc="Projects shared with you."
                    />
                    <div className="divider" />
                    <MyProjects
                        projects={allProjects}
                        title="All Projects"
                        desc="Every project you ever had."
                    />
                </section>
            )}
        </div>
    );
}


