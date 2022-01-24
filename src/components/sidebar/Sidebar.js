import React from 'react';
import './Sidebar.css';
import { SidebarData } from './SidebarData';


function Sidebar() {
    return (
        <div className="Sidebar">
             

            <ul className="SidebarList">
            
                {SidebarData.map((val, key) => {
                    return (
                        <li className="row"
                            key={key}
                            id={window.location.pathname === val.path ? "active" : ""}
                            onClick={() => {
                                window.location.pathname = val.path;
                            }}>

                            <div id="icon">{val.icon}</div>
                            <div id="title">{val.title}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;
