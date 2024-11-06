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
        <div className="bgContain" onClick={onClose}>
        </div>
        <form className="popupBox">
        <h1>New Project</h1>
        <button type="button" onClick={onClose} className="closeButton closeTag">X</button>
        <p className='closeTag2'>Click anywhere on the background to exit</p>
        <div className="labelInput">
          <label className="labelField">Project Name: </label>
          <input type="text" placeholder={'New Project #' + projCount}></input>
        </div>
        <div className="labelInput">
          <label className="labelField">Website: </label>
          <input type="text"></input>
        </div>
        <div>
          <h2>Visibility</h2>
          <div className="labelInput">
            <input type="radio" className="visibility" id="public" name="visib" />
            <label htmlFor="public">Public</label>
            <input type="radio" className="visibility" id="private" name="visib" />
            <label htmlFor="private">Private</label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateProject;
