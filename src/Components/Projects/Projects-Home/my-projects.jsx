import { useState, useEffect, useRef } from "react";
import AddProject from "../add-project";
import CreateProject from "../create-project";

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

    return (
        <>
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
                    {add && <AddProject name={null} id="add" onClick={handleCardClick} />}
                </div>
            </section>

            {selectedProject !== null && selectedProject === "add" && (
                <CreateProject projCount={projects.length} onClose={handleCloseCreateProject} />
            )}
        </>
    );
}
