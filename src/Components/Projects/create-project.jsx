import React, { useEffect } from 'react';
import './create-project.css';

function CreateProject({ projCount, onClose }) {
  useEffect(() => {
    const handleEscPress = (event) => {
      if (event.key === 'Escape') {
        onClose();  // Close the popup on "Escape" key press
      }
    };

    window.addEventListener('keydown', handleEscPress);
    return () => {
      window.removeEventListener('keydown', handleEscPress);
    };
  }, [onClose]);

  return (
    <div>
        <div className="bgContain" onClick={onClose}></div>
        <form className="popupBox">
            <h1>Create New Project</h1>
            <div className="labelInput">
                <label className="labelField">Project Name:</label>
                <input type="text" placeholder={'New Project #' + projCount} className="inputField" />
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
                <div className="fileDropZone">Drag or drop to upload file</div>
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
