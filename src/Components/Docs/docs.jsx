import React from 'react';
import './docs.css';

const Docs = () => {
  return (
    <div className="docs-container">
      <h1>Application Documentation</h1>

      <section className="introduction">
        <h2>Introduction</h2>
        <p>
          This application is a full-stack project management and test automation platform.
          It allows users to create projects, run tests using Docker containers, view test logs,
          and manage shared projects. The system uses JWT-based authentication and MongoDB as the database.
        </p>
      </section>

      <section className="features">
        <h2>Features</h2>
        <ul>
          <li>User Registration & Login (JWT authentication)</li>
          <li>Create Projects with file uploads and drag-and-drop functionality</li>
          <li>Test Suite creation with selected test cases</li>
          <li>Run tests in Docker containers</li>
          <li>View test logs and results</li>
          <li>Projects can be owned or shared with other users</li>
        </ul>
      </section>

      <section className="api-endpoints">
        <h2>API Endpoints</h2>
        <h3>User Authentication</h3>
        <ul>
          <li>
            <strong>POST /api/register</strong> - Register a new user.
          </li>
          <li>
            <strong>POST /api/login</strong> - Log in and receive a JWT token.
          </li>
        </ul>

        <h3>Project Management</h3>
        <ul>
          <li>
            <strong>POST /create-project</strong> - Create a new project.
          </li>
          <li>
            <strong>GET /projects</strong> - Fetch projects grouped by <code>owned_projects</code> and <code>shared_with_projects</code>.
          </li>
          <li>
            <strong>GET /projects/:projectName</strong> - Fetch project details by name.
          </li>
        </ul>

        <h3>Test Execution</h3>
        <ul>
          <li>
            <strong>POST /run-tests</strong> - Trigger tests for a specified project.
          </li>
          <li>
            <strong>POST /get-logs</strong> - Retrieve test logs for a project.
          </li>
          <li>
            <strong>POST /get-scripts</strong> - Retrieve test scripts associated with a project.
          </li>
        </ul>
      </section>

      <section className="frontend-components">
        <h2>Frontend Components</h2>
        <ul>
          <li>
            <strong>CreateProject.jsx</strong> - Create a new project with file upload and drag-and-drop support.
          </li>
          <li>
            <strong>ProjectHome.jsx</strong> - Manage and view projects (owned and shared).
          </li>
          <li>
            <strong>TestSuite.jsx</strong> - Create test suites and run selected test cases.
          </li>
          <li>
            <strong>Docs.jsx</strong> - Documentation page (this page).
          </li>
        </ul>
      </section>

      <section className="setup">
        <h2>Setup & Running the Application</h2>
        <ol>
          <li>Clone the repository.</li>
          <li>Run <code>npm install</code> to install dependencies.</li>
          <li>
            Set up your environment variables (e.g., <code>MONGO_URI</code>, <code>SECRET_KEY</code>).
          </li>
          <li>Run <code>npm start</code> to start the server.</li>
        </ol>
      </section>

      <section className="additional-info">
        <h2>Additional Information</h2>
        <p>
          For more detailed instructions, please refer to the README file in the repository.
          If you encounter any issues or have questions, feel free to reach out to the development team.
        </p>
      </section>
    </div>
  );
};

export default Docs;
