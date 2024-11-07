import React from "react";
import { useState } from "react";
import './Sidebar.css'

function Sidebar(base){
    let items;
    base ? items = ["Project Overview", "View Cases", "Run Cases"] : items = ["Home","Projects","Guide","Account"];
    let icons = [];

    const [selectedIndex,setSelectedIndex] = useState(0);

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