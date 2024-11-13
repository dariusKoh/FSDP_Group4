import { useState, useEffect, useRef } from "react";
import AddProject from "../add-project";
import CreateProject from "../create-project";
import ViewProject from "../view-projects";

export default function MyProjects({ projects, add, title, desc, onProjectSelect }) {
    const scrollContainerRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const handleScroll = (event) => {
            event.preventDefault();
            scrollContainerRef.current.scrollLeft += event.deltaY;
        };
        const scrollContainer = scrollContainerRef.current;
        scrollContainer.addEventListener('wheel', handleScroll);

        return () => {
            scrollContainer.removeEventListener('wheel', handleScroll);
        };
    }, []);

    const handleCardClick = (id, name) => {
        setSelectedProject(id);
        onProjectSelect(name);  // Notify parent component of project selection
    };

    const handleCloseCreateProject = () => {
        setSelectedProject(null);
    };

    const handleCloseViewProject = () => {
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
                                    id={index}
                                    name={project}
                                    onClick={() => handleCardClick(index, project)}
                                />
                            ))}
                            {add && <AddProject name={null} id="add" onClick={() => handleCardClick("add")} />}
                        </div>
                    </section>
                </div>
            ) : (
                <div className="view-project">
                    <ViewProject projectId={selectedProject} onClose={handleCloseViewProject} />
                </div>
            )}
        </div>
    );
}
