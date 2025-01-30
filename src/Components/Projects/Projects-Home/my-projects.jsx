import { useState, useEffect, useRef } from "react";
import AddProject from "../add-project";
import CreateProject from "../create-project";
import Overview from "../../ProjectOverview/overview";

export default function MyProjects({ projects, add, title, desc, onProjectSelect, onAddNewProject }) {
    const scrollContainerRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const handleScroll = (event) => {
            event.preventDefault();
            scrollContainerRef.current.scrollLeft += event.deltaY;
        };
        const scrollContainer = scrollContainerRef.current;
        scrollContainer.addEventListener("wheel", handleScroll);
        return () => {
            scrollContainer.removeEventListener("wheel", handleScroll);
        };
    }, []);
    const handleCardClick = (id, name) => {
        setSelectedProject(id);
        onProjectSelect(name);
        setActiveState("Project Overview");
        onProjectSelect(project.proj_id, project.projectName, "myProjects")
    };

    const handleCloseCreateProject = () => {
        setSelectedProject(null);
    };

    const handleCreateProject = (newProjectName) => {
        onAddNewProject(newProjectName);
        setSelectedProject(null);
    };

    return (
        <div className="container mx-auto p-6">
            {selectedProject === null ? (
                <div className="project-list">
                    <h1>{title}</h1>
                    <h2 className="myDesc">{desc}</h2>
                    <section className="projContainer" ref={scrollContainerRef}>
                        <div className="projList">
                        {projects.map((project, index) => (
                            <AddProject
                                key={project._id} // Use MongoDB's unique `_id` as the key
                                id={project.proj_id}
                                name={project.projectName}
                                onClick={() => onProjectSelect(project.proj_id, project.projectName, "myProjects")} // Pass proj_id
                            />
                        ))}

                        
                            {add && (
                                <AddProject
                                    name={null}
                                    id="add"
                                    onClick={() => setSelectedProject("add")}
                                />
                            )}
                        </div>
                    </section>
                </div>
            ) :selectedProject === "add" ? (
                <CreateProject
                    projCount={projects.length + 1}
                    onClose={handleCloseCreateProject}
                    onAddProject={handleCreateProject}
                />
            ) : (
                <div className="view-project">
                    <Overview
                        projName={projects[selectedProject]?.projectName} // Ensure we pass the project name
                        lastDate="21/12/2023"
                        onClose={handleCloseCreateProject}
                    />

                </div>
            )}
        </div>
    );
}