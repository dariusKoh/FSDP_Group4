import React, { useState } from "react";
import './Sidebar.css';

function Sidebar({ base, setActiveState, projectName, onProjectOpened }) {
    // Define menu items based on the `base` prop
    const items = base
        ? [
            "Project Home",
            onProjectOpened ? projectName : "My Projects",
            "My Projects",
            "Shared With You",
            "All Projects",
            "Project Overview",
            "Run Cases"
        ]
        : ["Home", "Projects", "Guide", "Account"];

    const [selectedIndex, setSelectedIndex] = useState(0);

    // Ensure setActiveState is a valid function
    if (!setActiveState || typeof setActiveState !== 'function') {
        console.log("Error: setActiveState is not a function");
        return null;
    }

    return (
        <ul className="sideList">
            {items.map((item, index) => (
                <li
                    key={item}
                    className={selectedIndex === index ? 'active listItem' : 'listItem'}
                    onClick={() => {
                        setSelectedIndex(index);
                        setActiveState(item);
                    }}
                >
                    {item}
                </li>
            ))}
        </ul>
    );
}

export default Sidebar;
