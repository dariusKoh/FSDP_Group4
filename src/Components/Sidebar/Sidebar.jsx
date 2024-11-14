import React, { useEffect, useState } from "react";
import './Sidebar.css';

function Sidebar({ base, onProjectSelect, onProjectOpened, projectName, setActiveState }) {
    console.log("Type of setActiveState in Sidebar:", typeof setActiveState); // Should log "function"

    // Define items based on login state and whether a project is opened
    let items;
    if (onProjectOpened) {
        items = [projectName, "Help", "Documentation"];
    } 
    // else if (base) {
    //     items = ["Projects", "Guide", "Account"];
    // }
     else {
        items = ["Project Home", "Help", "Documentation"];
    }

    const [activeItem, setActiveItem] = useState(items[0] || "Project Home"); // Default to "Project Home"
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    console.log("onProjOpen: "+onProjectOpened)
    return (
        <ul className="sideList">
            {items.map((item) => (
                <React.Fragment key={item}>
                    {item === "Project Home" && !onProjectOpened ? (
                        <>
                            <li
                                className={activeItem === item ? 'active listItem' : 'listItem'}
                                onClick={() => {
                                    setActiveItem(item);
                                    setIsDropdownOpen(!isDropdownOpen);
                                    setActiveState(item); // Set active state in parent
                                }}
                            >
                                {item}
                            </li>
                            {isDropdownOpen && (
                                <ul className="dropdownList">
                                    {["My Projects", "Shared with You", "All Projects"].map((subItem) => (
                                        <li key={subItem}>
                                            <button 
                                                className={activeItem === subItem ? 'active btnItem' : 'btnItem'}
                                                onClick={() => {
                                                    setActiveItem(subItem);
                                                    setActiveState(subItem); // Set active state for sub-items
                                                }}
                                            >
                                                {subItem}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    ) : item === projectName && onProjectOpened ? (
                        <>
                            <li
                                className={activeItem === item ? 'active listItem' : 'listItem'}
                                onClick={() => {
                                    setActiveItem(item);
                                    setIsDropdownOpen(!isDropdownOpen);
                                    setActiveState(item); // Set active state for project-specific items
                                }}
                            >
                                {item}
                            </li>
                            {isDropdownOpen && (
                                <ul className="dropdownList">
                                    {["Project Overview", "View Cases", "Run Cases"].map((subItem) => (
                                        <li key={subItem}>
                                            <button
                                                className={activeItem === subItem ? 'active btnItem' : 'btnItem'}
                                                onClick={() => {
                                                    setActiveItem(subItem);
                                                    setActiveState(subItem); // This will trigger handleRunCases if "Run Cases" is clicked
                                                }}
                                            >
                                                {subItem}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    ) : (
                        <li 
                            className={activeItem === item ? 'active listItem' : 'listItem'}
                            onClick={() => {
                                setActiveItem(item);
                                setActiveState(item); // Set active state for regular items
                            }}
                        >
                            {item}
                        </li>
                    )}
                </React.Fragment>
            ))}
        </ul>
    );
}

export default Sidebar;