import React, { useEffect, useRef, useState } from 'react';
import './create-project.css';

function CreateProject({ projCount, onClose, onAddProject }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [projectName, setProjectName] = useState(`New Project #${projCount}`);

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
    setSelectedFiles(files);
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
    setSelectedFiles(files);
  };

  function handleCreateProject(event) {
    event.preventDefault();
    if (typeof onAddProject === 'function') {
      onAddProject(projectName);
    }
    onClose();
  }
  

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
              <input type="radio" name="visibility" value="Public" />
              <span>Public</span>
            </label>
            <label className="radioOption">
              <input type="radio" name="visibility" value="Private" />
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
