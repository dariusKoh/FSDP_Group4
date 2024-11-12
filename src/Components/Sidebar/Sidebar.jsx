import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ base, onProjectSelect, onProjectOpened, projectName }) {
    // Define items based on login state and whether a project is opened
    let items;
    if (onProjectOpened) {
        // After a project has been opened
        items = ["Home", projectName, "Help", "Documentation"];
    } else if (base) {
        // Before login (or for non-project states)
        items = ["Home", "Projects", "Guide", "Account"];
    } else {
        // After login but before a project is selected
        items = ["Home", "Project Home", "Help", "Documentation"];
    }

    const [activeItem, setActiveItem] = useState(items[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

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
                                                    navigate(`/${subItem.toLowerCase().replace(/\s+/g, '-')}`);
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
                                                    navigate(`/${projectName.toLowerCase().replace(/\s+/g, '-')}/${subItem.toLowerCase().replace(/\s+/g, '-')}`);
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
                            onClick={() => setActiveItem(item)}
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
