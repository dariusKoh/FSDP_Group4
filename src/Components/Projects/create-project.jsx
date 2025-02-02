import React, { useEffect, useRef, useState } from 'react';
import './create-project.css';

function CreateProject({ projCount, onClose, onAddProject }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [projectName, setProjectName] = useState(`New Project #${projCount}`);
  const [visibilityOption, setVisibilityOption] = useState("Public"); // File visibility

  useEffect(() => {
    const handleEscPress = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscPress);
    return () => {
      window.removeEventListener('keydown', handleEscPress);
    };
  }, [onClose]);

  const handleDropZoneClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    
    // Read file contents
    const fileReaders = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({ name: file.name, content: e.target.result });
        reader.onerror = reject;
        reader.readAsText(file);
      });
    });

    Promise.all(fileReaders)
      .then(fileContents => setSelectedFiles(fileContents))
      .catch(error => console.error("Error reading files:", error));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const files = Array.from(event.dataTransfer.files);
    handleFileChange({ target: { files } });
  };

  const handleCreateProject = async (event) => {
    event.preventDefault();

    const newProject = {
        projectName,
        visibility: visibilityOption,
        ownerid: parseInt(localStorage.getItem("user_id")),
        files: selectedFiles, // Pass uploaded files
    };
    if (selectedFiles.length === 0){
      return;
    }
    try {
        const response = await fetch('http://localhost:3001/create-project', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProject),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Project created:", data.project);

            if (typeof onAddProject === 'function') {
                onAddProject(data.project);
            }
            onClose();
        } else {
            console.error("Error creating project");
        }
    } catch (error) {
        console.error("Failed to create project:", error);
    }
};



  return (
    <div>
      <div className="bgContain" onClick={onClose}></div>
      <form className="popupBox" onSubmit={handleCreateProject}>
        <h1>Create New Project</h1>
        <div className="labelInput">
          <label className="labelField">Project Name:</label>
          <input 
            type="text" 
            placeholder={`New Project #${projCount}`} 
            className="inputField" 
            value={projectName} 
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>

        <div className="labelInput">
          <label className="labelField">Website:</label>
          <input type="text" className="inputField" />
        </div>

        <div className="labelInput">
          <label className="labelField">Visibility:</label>
          <div className="visibilityOptions">
            <label className="radioOption">
              <input
                type="radio"
                name="visibility"
                value="Public"
                checked={visibilityOption === "Public"}
                onChange={() => setVisibilityOption("Public")}
              />
              <span>Public</span>
            </label>
            <label className="radioOption">
              <input
                type="radio"
                name="visibility"
                value="Private"
                checked={visibilityOption === "Private"}
                onChange={() => setVisibilityOption("Private")}
              />
              <span>Private</span>
            </label>
          </div>
        </div>

        <div className="fileUploadSection">
          <label>Upload Test File:</label>
          <div
            className={`fileDropZone ${dragActive ? 'active' : ''}`}
            onClick={handleDropZoneClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            Drag or drop to upload file
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="fileInput"
            onChange={handleFileChange}
            multiple
          />
          {selectedFiles.length > 0 && (
            <div className="fileList">
              <h4>Selected Files:</h4>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="buttonGroup">
          <button type="button" className="cancelButton" onClick={onClose}>Cancel</button>
          <button type="submit" className="createButton">Create Project</button>
        </div>
      </form>
    </div>
  );
}

export default CreateProject;