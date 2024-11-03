import React from "react";
import { useState } from "react";
import './Sidebar.css'

function Sidebar(){

    let items = ["Home", "Projects", "View Cases", "Edit Cases","Run Tests","Config"];
    let icons = [];

    const [selectedIndex,setSelectedIndex] = useState(-1);

    return(
        <>
            <ul className="sideList">
                {items.map((item, index) =>(<li className={selectedIndex === index ? 'active listitem' : 'listItem'} key={item} onClick={()=>{
                    setSelectedIndex(index);
                    }}>{item}</li>))}
            </ul>
        </>
    )
    
}
export default Sidebar;