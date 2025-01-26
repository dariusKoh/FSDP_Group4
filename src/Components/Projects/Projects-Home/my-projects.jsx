import { useState, useEffect, useRef } from "react";
import AddProject from "../add-project";
import CreateProject from "../create-project";
import Overview from "../../ProjectOverview/overview";

export default function MyProjects({ projects, add, title, desc, onAddNewProject }) {
    const scrollContainerRef = useRef(null);
    const [activeState, setActiveState] = useState(null);
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

    const handleCardClick = (project) => {
        setSelectedProject(project); // Store the full project object
        setActiveState("Project Overview");
        console.log(project)
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
                                    key={index}
                                    id={project.proj_id}
                                    name={project.projectName}
                                    onClick={() => handleCardClick(project)} // Pass the entire project object
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
            ) : selectedProject === "add" ? (
                <CreateProject
                    projCount={projects.length + 1}
                    onClose={handleCloseCreateProject}
                    onAddProject={handleCreateProject}
                />
            ) : (
                <div className="view-project">
                    <Overview
                        projName={selectedProject.projectName} // Use the selected project's data
                        projId={selectedProject.proj_id} // Pass the project ID
                        lastDate="21/12/2023"
                        onClose={handleCloseCreateProject}
                    />
                </div>
            )}
        </div>
    );
}
