import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./add-project.css";

function AddProject(name,icon,key) {
  if (name == null){
    return (
      <Card className='AddProject' key={key}>
        <Card.Img className='preview' variant="top" src={icon || "/../../.././assets/white_background_smooth.png"} />
        <Card.Body>
          <Card.Title className='projName'>Add New Project</Card.Title>
        </Card.Body>
      </Card>
    );
  }
  return (
    <Card className='AddProject' key={key}>
      <Card.Img className='preview' variant="top" src={icon || "/../../.././assets/white_background_smooth.png"} />
      <Card.Body>
        <Card.Title className='projName'>{name}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default AddProject;


