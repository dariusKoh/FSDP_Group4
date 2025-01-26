import Card from 'react-bootstrap/Card';
import "./add-project.css";
import addProjImg from '../../assets/add-project.png';
import defaultImg from "../../assets/white_background_smooth.jpg";
import { useState } from 'react';

function AddProject({ name, icon, id, lastOpened, onClick }) {
  const [currentProject, setCurrentProject] = useState(null);
  const handleClick = () => {
    onClick(id);  // Pass the `id` prop when clicking
    const project = {
      "projectName": name,
      "proj_id": id
    }
    setCurrentProject(project);
  };

  if (name == null) {
    return (
      <Card className='AddProject' onClick={handleClick}>
        <Card.Img className='preview' variant="top" src={addProjImg} draggable="false" />
        <Card.Body>
          <Card.Title className='projName'>Add New Project</Card.Title>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className='AddProject' onClick={handleClick}>
      <Card.Img className='preview' variant="top" src={icon || defaultImg} draggable="false" />
      <Card.Body>
        <Card.Title className='projName'>{name}</Card.Title>
        <div className='lastOpen'>Last opened: {lastOpened}</div>
      </Card.Body>
    </Card>
  );
}

export default AddProject;

