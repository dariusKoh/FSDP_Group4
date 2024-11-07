import { useState, useEffect, useRef } from "react";
import AddProject from "../add-project";
import CreateProject from "../create-project";

export default function MyProjects({ projects, add, title, desc }) {
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

  const handleCardClick = (id) => {
    setSelectedProject(id);
  };

  const handleCloseCreateProject = () => {
    setSelectedProject(null); // Close the CreateProject component
  };
  console.log("Projects = "+projects.length)
  if (projects == []){
    console.log("No proj.");
    return (
      <>
      <h1>{title}</h1>
      <h2 className="myDesc">Nothing here.</h2>
      </>
    )
  }
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
              onClick={handleCardClick}
            />
          ))}
          {add && <AddProject name={null} id="add" onClick={handleCardClick} />}
        </div>
      </section>

      {selectedProject !== null && selectedProject == "add" && (
        <CreateProject projCount={projects.length} onClose={handleCloseCreateProject} />
      )}
    </>
  );
}
