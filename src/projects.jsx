// app.js (or ProjectPage.jsx)
import React, { Fragment, useState, useEffect } from "react";
import NavbarLoggedIn from "./Components/NavBar/NavbarLoggedIn";
import Sidebar from "./Components/Sidebar/Sidebar";
import Overview from "./Components/ProjectOverview/overview";
import ProjectHome from "./Components/Projects/Projects-Home/project-home";
import LoadingScreen from "./Components/Runtime/loading";
import CreateProject from "./Components/Projects/create-project";
import ViewCases from "./Components/Viewcase/View-Cases";
import Docs from "./Components/Docs/docs";
import Help from "./Components/Help/help";
import TestCaseDetails from "./Components/TestLog/TestCaseDetails";

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [activeState, setActiveState] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [proj_id, setproj_id] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const [testLogs, setTestLogs] = useState([]);
  const [showCreateProject, setShowCreateProject] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3001/check-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then((response) => response.json())
        .then((data) => setIsAdmin(data.isAdmin))
        .catch((error) => console.error("Error checking admin status:", error));
    }
  }, []);

  const handleRunCases = async () => {
    if (!proj_id) {
      console.error("No project selected.");
      return;
    }
    const username = localStorage.getItem("username");
    setIsLoading(true);
    setActiveState("Run Cases");

    try {
      const response = await fetch("http://localhost:3001/run-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proj_id, username }),
      });

      if (!response.ok) {
        console.error("Error running tests");
        setIsLoading(false);
        return;
      }

      console.log("Tests started, waiting for completion...");
      await fetchLogsFromDB();
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to run tests:", error);
      setIsLoading(false);
    }
  };

  const fetchLogsFromDB = async () => {
    if (!proj_id) {
      console.warn("fetchLogsFromDB called with null proj_id!");
      return;
    }

    console.log("Fetching logs for proj_id:", proj_id);
    try {
      const response = await fetch("http://localhost:3001/get-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proj_id }),
      });

      const logsData = await response.json();

      if (!Array.isArray(logsData)) {
        console.error("Unexpected response format:", logsData);
        return;
      }

      setTestLogs(logsData);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  };

  const fetchTestCases = async () => {
    if (!proj_id) {
      console.warn("fetchTestCases called with null proj_id!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/get-scripts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proj_id }),
      });

      const data = await response.json();
      setTestCases(data);
    } catch (error) {
      console.error("Error fetching test cases:", error);
    }
  };

  useEffect(() => {
    if (proj_id && activeState !== "Help" && activeState !== "Documentation") {
      console.log("useEffect triggered: Fetching logs for proj_id:", proj_id);
      fetchLogsFromDB();
    }
  }, [proj_id]);

  const updateActiveState = (val, newproj_id = null, testCase = null) => {
    if (newproj_id) {
      setproj_id(newproj_id);
    }
    if (val === "Run Cases") {
      handleRunCases();
    } else {
      // If a test case is provided, store it
      if (testCase) {
        setSelectedTestCase(testCase);
      }
      setActiveState(val);
      if (val === "View Cases") {
        fetchTestCases();
      }
    }
  };

  const handleAddProject = (projectName) => {
    setProjects((prevProjects) => [...prevProjects, projectName]);
  };

  const handleDeleteProject = async () => {
    if (!proj_id) {
      console.error("No project selected.");
      return;
    }

    const token = localStorage.getItem("token");
    console.log("Token value:", token);

    if (!token) {
      console.error("No token found.");
      return;
    }

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });
    if (window.confirm("Are you sure you want to delete project?")) {
      try {
        const response = await fetch("http://localhost:3001/delete-project", {
          method: "POST",
          headers,
          body: JSON.stringify({ project: { proj_id } }),
        });

        if (!response.ok) {
          console.error("Error deleting project:", response.statusText);
          return;
        }

        const data = await response.json();
        console.log("API response:", data);

        if (data.error) {
          console.error("Error deleting project:", data.error);
        } else {
          console.log("Project deleted successfully:", data);
          updateActiveState("Project Home");
        }
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const renderComponent = () => {
    console.log(activeState);
    switch (activeState) {
      case "Project Home":
      case null:
        return (
          <ProjectHome
            projects={projects}
            setCurrentProject={setCurrentProject}
            setActiveState={setActiveState}
            setproj_id={setproj_id}
            proj_id={proj_id}
            updateActiveState={updateActiveState}
          />
        );
      case "View Cases":
        return <ViewCases cases={testCases} projName={currentProject} />;
      case "TestCaseDetails":
        return (
          <TestCaseDetails
            testCase={selectedTestCase}
            onClose={() => updateActiveState("Overview")}
          />
        );
      case "Help":
        return <Help />;
      case "Documentation":
        return <Docs />;
      default:
        if (isLoading) {
          return <LoadingScreen />;
        }
        return (
          <Overview
            testLogs={testLogs}
            projName={currentProject}
            proj_id={proj_id}
            onClose={() => setActiveState(null)}
            onTestCaseClick={(state, newProj, test) => updateActiveState(state, newProj, test)}
          />
        );
    }
  };

  return (
    <Fragment>
      <NavbarLoggedIn />
      <Sidebar
        base={false}
        setActiveState={updateActiveState}
        projectName={currentProject}
        onProjectOpened={!!currentProject}
        proj_id={proj_id}
        isAdmin={isAdmin}
        onDeleteProject={handleDeleteProject}
      />
      {renderComponent()}
      {showCreateProject && (
        <CreateProject
          projCount={projects.length + 1}
          onClose={() => {
            setShowCreateProject(false);
            setCurrentProject(null);
          }}
          onAddProject={handleAddProject}
        />
      )}
      <div style={{ textAlign: "center" }}>
        {activeState === "Project Overview" && (
          <button
            style={{ marginTop: "20px" }}
            onClick={handleDeleteProject}
          >
            Delete Project
          </button>
        )}
      </div>
    </Fragment>
  );
}
