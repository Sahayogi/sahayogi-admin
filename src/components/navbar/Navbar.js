import "./Navbar.css";
import avatar from "../../assets/metamask.png";
import { FiBell } from "react-icons/fi";
import logo from "../../assets/sahayogi.png";
import { Link } from "react-router-dom";

import React from "react";

const Navbar = () => {
    return (
    <nav className="navbar">
      <div className="navbarWrapper">
        <Link to="/home">
          <div className="navbarLeft">
            <img src={logo} alt="" />
          </div>
        </Link>

        <div className="navbarRight">
          {/* {<Notification />} */}
          <FiBell
            className="bell"
            onClick={() => {}}
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
