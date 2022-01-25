import React, { useContext } from "react";
import "./Sidebar.css";
import { SidebarData } from "./SidebarData";
import { Link } from "react-router-dom";
import { DetailContext } from "../../App";
import LogoutIcon from "@mui/icons-material/Logout";
function Sidebar() {
  const { loginStatus } = useContext(DetailContext);
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <Link to={val.path}>
              <li className="row" key={key}>
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </li>
            </Link>
          );
        })}
        {loginStatus === true ? (
          <Link to="/logout">
            <li className="row">
              <div id="icon">
                <LogoutIcon />
              </div>
              <div id="title">logout</div>
            </li>
          </Link>
        ) : (
          <Link to="/login">
            <li className="row">
              <div id="icon">
                <LogoutIcon />
              </div>
              <div id="title">login</div>
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
