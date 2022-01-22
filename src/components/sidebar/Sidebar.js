import React from 'react';
import './Sidebar.css';
import { SidebarData } from './SidebarData';

function Sidebar() {
    return (
        <div className="Sidebar">
            <div className="SidebarLogo" >
                <h1 className="h1">SAHAYOGI</h1>
        
            </div>
            <ul className="SidebarList">
                {SidebarData.map((val, key) => {
                    return (
                        <li className="row"
                            key={key}
                            id={window.location.pathname == val.link ? "active" : ""}
                            onClick={() => {
                                window.location.pathname = val.link;
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
