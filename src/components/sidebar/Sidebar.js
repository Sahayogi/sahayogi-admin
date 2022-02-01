import React from "react";

import "./Sidebar.css";
import { SidebarData as AdminSidebar, SidebarDataForA as AgencySidebar} from "./SidebarData";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/UserContext"

const Sidebar = () => {
  const { data } = useAuth();
 
  return (
   
    <div className="Sidebar">
    
      <div className="SidebarList">
        { data.role&&
          data.role === "admin" &&
          AdminSidebar.map((val, key) => {
            return (
              <Link to={val.path}>
                <div className="row" key={key}>
                  <div id="icon">{val.icon}</div>
                  <div id="title">{val.title}</div>
                </div>
              </Link>
            );
          })}
        {data.role&&
          data.role !== "admin" &&
          AgencySidebar.map((val, key) => {
            return (
              <Link to={val.path}>
                <div className="row" key={key}>
                  <div id="icon">{val.icon}</div>
                  <div id="title">{val.title}</div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  
  );
};

export default Sidebar;
