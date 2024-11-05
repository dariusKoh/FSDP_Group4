import Card from 'react-bootstrap/Card';
import "./add-project.css";
import addProjImg from '../../assets/add-project.png';
import defaultImg from "../../assets/white_background_smooth.jpg";
import CreateProject from './create-project.jsx';

function AddProject(name,icon,key,lastOpened) {
  if (name == null){
    return (
      <Card className='AddProject' key={key} onClick={()=>{
        CreateProject(key)}}>
        <Card.Img className='preview' variant="top" src={addProjImg} draggable="false" select/>
        <Card.Body>
          <Card.Title className='projName'>Add New Project</Card.Title>
        </Card.Body>
      </Card>
    );
  }
  return (
    <Card className='AddProject' key={key}>
      <Card.Img className='preview' variant="top" src={icon || defaultImg} draggable="false"/>
      <Card.Body>
        <Card.Title className='projName'>{name}</Card.Title>
        <div className='lastOpen'>Last opened: {lastOpened}</div>
      </Card.Body>
    </Card>
  );
}

export default AddProject;


