import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/sahayogi.png";
import { DetailContext } from "../App";
const Login = () => {
  const { setIsLoginActive } = useContext(DetailContext);
  //useeffect
  setIsLoginActive(true);
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
          <div className="loginWrapper">
            <h1>Login</h1>

            <form className="loginCard">
              <div className="form-control">
                <label htmlFor="email"> Email: </label>
                <input type="email" name="" placeholder="email" id="" />
              </div>
              <div className="form-control">
                <label htmlFor="password"> Password: </label>
                <input type="password" name="" id="" />
              </div>

              <button onClick={() => setIsLoginActive(false)}>
                <Link to="/home">login</Link>
              </button>
            </form>
            <div className="banner">
              <div className="bannerContent">
                Not registered? <Link to="#">Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
