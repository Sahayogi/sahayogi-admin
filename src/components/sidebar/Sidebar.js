import React from "react";

import "./Sidebar.css";
import {
  SidebarData as AdminSidebar,
  SidebarDataForA as AgencySidebar,
} from "./SidebarData";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/UserContext";

const Sidebar = () => {
  const {
    data: { role },
  } = useAuth();

  return (
    <div className="Sidebar">
      <div className="SidebarList">
        {role &&
          role === "admin" &&
          AdminSidebar.map((val) => {
            return (
              <Link to={val.path}>
                <div className="row" key={val.path}>
                  <div id="icon">{val.icon}</div>
                  <div id="title">{val.title}</div>
                </div>
              </Link>
            );
          })}
        {role&&
          role !== "admin" &&
          AgencySidebar.map((val) => {
            return (
              <Link to={val.path}>
                <div className="row" key={val.path}>
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
