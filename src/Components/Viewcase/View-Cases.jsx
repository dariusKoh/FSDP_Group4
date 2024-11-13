import React from 'react'
import { useRef, useEffect } from 'react';
import Typed from 'typed.js';
import './View-Cases.css';

function ViewCases({cases, projName}){
  const el = useRef(null);
    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["View Test Cases"],
            startDelay: 300,
            typeSpeed: 100,
            backSpeed: 150,
            backDelay: 200,
            loop: false,
            showCursor: false
        });
        return () => {
            typed.destroy(); // Clean up Typed instance
        };
    }, []);



  let sampledata = [
    {
      testId: 2,
      name: "Corn",
      status: "PASSED",
      duration: 1322,
      createdAt: "12/12/2024",
      failureMessages: null
    },
    {
      testId: 3,
      name: "test2",
      status: "FAILED",
      duration: 329,
      createdAt: "23/11/2022",
      failureMessages: "Test Case to do shii"
    }
  ]
  cases = sampledata;
  
  const filteredTests = cases;
  return (
    <div className="viewCases">
        <span className="mainHead" ref={el} />
        <p className="desc">View all your test cases for {projName} here. See all yout individual test cases!</p>
        <div className="test-table">
          <table>
            <thead>
              <tr>
                <th>Test ID</th>
                <th>Test Case Name</th>
                <th>Status</th>
                <th>Duration</th>
                <th>Last Tested</th>
                <th>Comments</th>
            </tr>
              </thead>
              <tbody>
              {filteredTests.map((test, index) => (
                <tr key={index} className={test.status === "PASSED" ? "pass" : "fail"}>
                  <td>{test.name}</td>
                  <td>{test.testId}</td>
                  <td>{test.status}</td>
                  <td>{test.duration}</td>
                  <td>{test.createdAt}</td>
                  <td>{test.failureMessages}</td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default ViewCases;