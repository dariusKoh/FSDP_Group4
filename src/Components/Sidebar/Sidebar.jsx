import React, { useState } from "react";
import './Sidebar.css';

function Sidebar({ base, onProjectSelect, onProjectOpened, projectName, projectId, setActiveState }) {
    console.log("Type of setActiveState in Sidebar:", typeof setActiveState); // Should log "function"

    // Define items based on login state and whether a project is opened
    let items;
    if (onProjectOpened) {
        items = [projectName, "Help", "Documentation"];
    } else {
        items = ["Project Home", "Help", "Documentation"];
    }

    const [activeItem, setActiveItem] = useState(items[0] || "Project Home"); // Default to "Project Home"
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleItemClick = (item) => {
        // Ensure valid active item
        if (item && item !== activeItem) {
            setActiveItem(item);
            setActiveState(item);  // Only call setActiveState with valid values
        }
    };

    return (
        <ul className="sideList">
            {items.map((item, index) => (
                <React.Fragment key={item + index}>  {/* Unique key using item + index */}
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
                                    {["My Projects", "Shared with You", "All Projects"].map((subItem, subIndex) => (
                                        <li key={subItem + subIndex}>  {/* Ensure unique key for subItems */}
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
                                    {["Project Overview", "View Cases", "Run Cases"].map((subItem, subIndex) => (
                                        <li key={subItem + subIndex}>  {/* Ensure unique key for subItems */}
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
                            onClick={() => handleItemClick(item)} // Updated to handle item click
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
