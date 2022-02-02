import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/sahayogi.png";
import { useAuth } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    data: { role },
    loginUser,
  } = useAuth();


  const handleLogin = (e) => {
    if (email === "anisha@gmail.com" && password === "12345") {
      loginUser({ email });
    }
  };

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
                <label htmlFor="role"> Role: </label>
                <input type="text" value={role} onChange={(e) => {}} />
              </div>
              <div className="form-control">
                <label htmlFor="email"> Email: </label>
                <input
                  type="email"
                  value={email}
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label htmlFor="password"> Password: </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button onClick={handleLogin}>
                <span>login</span>
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
