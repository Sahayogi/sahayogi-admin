import "./Navbar.css";
import avatar from "../../assets/metamask.png";
import { FiBell } from "react-icons/fi";
import logo from "../../assets/sahayogi.png";
import { Link } from "react-router-dom";
import Login from "../../pages/Login";
import Notification from "../Notification/Notification";
import { DetailContext } from "../../App";
import React, { useContext } from "react";

const Navbar = () => {
  const handleMetamask = () => {
    return;
  };
  const { notification, setNotification } = useContext(DetailContext);
  return (
    <nav className="navbar">
      <div className="navbarWrapper">
        <Link to="/home">
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

          {/* <div className="metamaskButton" onClick={handleMetamask}>
            Connect To Metamask
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
