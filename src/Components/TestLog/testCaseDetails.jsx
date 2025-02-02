// Components/TestLog/TestCaseDetails.jsx
import React from 'react';
import './testCaseDetails.css';

function TestCaseDetails({ testCase, onClose }) {
  if (!testCase) {
    return (
      <div className="test-case-details-container">
        <button className="close-button" onClick={onClose}>Close</button>
        <h1>No test case selected.</h1>
      </div>
    );
  }

  // Destructure the properties from testCase
  const { testId, ancestorTitles, fullTitle, createdAt, status, duration, failureMessages, summary } = testCase;
  // Build the full test case name using ancestorTitles if available
  const testCaseName = Array.isArray(ancestorTitles) && ancestorTitles.length > 0 
    ? `${ancestorTitles.join(' > ')} > ${fullTitle}`
    : fullTitle;

  return (
    <div className="test-case-details-container">
      <button className="returnBtn" onClick={onClose} id="testClose" >Close</button>
      <h1>{testCaseName}</h1>
      <p><strong>Test Case Id:</strong> {testId}</p>
      <p><strong>Date Ran:</strong> {new Date(createdAt).toLocaleString()}</p>
      <p><strong>STATUS:</strong> {status}</p>
      <p><strong>Duration:</strong> {duration} ms</p>
      <p><strong>AI Summary:</strong> {summary}</p>
      <p><strong>Full failure message:</strong></p>
      <pre>{failureMessages || "N/A"}</pre>
    </div>
  );
}

export default TestCaseDetails;
