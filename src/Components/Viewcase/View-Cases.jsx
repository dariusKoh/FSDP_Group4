import React, { useRef, useEffect } from 'react';
import Typed from 'typed.js';
import './View-Cases.css';

function ViewCases({ cases, projName }) {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["View scripts"],
            startDelay: 300,
            typeSpeed: 100,
            backSpeed: 150,
            backDelay: 200,
            loop: false,
            showCursor: false
        });
        return () => {
            typed.destroy();
        };
    }, []);
    console.log(cases)
    return (
        <div className="viewCases">
            <span className="mainHead" ref={el} />
            <p className="desc">View all your scripts for {projName} here. See all your individual scripts!</p>
            <div className="test-table">
                <table>
                    <thead>
                        <tr>
                            <th>Test ID</th>
                            <th>Test Case Name</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cases.map((test) => (
                            <tr key={test._id}>
                                <td>{test._id}</td>
                                <td>{test.scriptName}</td>
                                <td>{new Date(test.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewCases;
