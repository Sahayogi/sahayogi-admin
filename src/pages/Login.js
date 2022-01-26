import React from "react";
import { Link } from 'react-router-dom'
import logo from '../assets/sahayogi.png'
const Login = () => {
  return (
    <>
      <div className="login">
        <div className="loginLeft">
        <div className="loginWrapper">
        <img src={logo} alt="" />
          <h1>CASH AND VOUCHER ASSISTANCE USING BLOCKCHAIN</h1>
     
        </div>

           </div>

        <div className="loginRight">
          <Link to='/home'>
            <button>login</button>
          </Link>
        </div>

      </div>
    </>
  );
};

export default Login;
