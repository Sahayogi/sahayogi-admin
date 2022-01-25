import "./Navbar.css";
import avatar from "../../assets/metamask.png";
import { FiBell } from "react-icons/fi";
import logo from "../../assets/Sahayogi.png";
import { Link } from "react-router-dom";
import Login from "../../pages/Login";
import Notification from "../Notification/Notification";
import { DetailContext } from "../../App";
import React, { useContext } from "react";

const Navbar = () => {
  const { notification, setNotification } = useContext(DetailContext);
  return (
    <nav className="navbar">
      <Link to="/">
        <div className="navbarLeft">
          <img src={logo} alt="" />
        </div>
      </Link>
      <div className="navbarRight">
        {notification && <Notification />}
        <FiBell
          className="bell"
          onClick={() => setNotification(!notification)}
        />
        <div className="image">
          <img src={avatar} alt="" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
