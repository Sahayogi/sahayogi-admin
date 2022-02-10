import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import logo from "../assets/sahayogi.png";
import { useAuth } from "../context/UserContext";
// import { login as loginApi } from "../apis";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const VisibilityButton = styled.button`
  height: 12px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const { data, loadUser } = useAuth();

  const login = async (e) => {
    try {
      console.log("login pending ");
      const res = await axios({
        url: "http://167.71.226.245:3005/api/auth/login",
        method: "POST",
        data: {
          userName: email,
          password,
          userRole: "ADMIN",
        },
      });

      console.log(res, "res");
      loadUser(res.data);
    } catch (err) {
      console.log(err, "err");
    }
  };

  const handleLogin = (e) => {
    if (email === "anisha@gmail.com" && password === "12345") {
      loadUser({ email });
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
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <VisibilityButton onClick={(e) => setShow(!show)}>
                <>{show ? <VisibilityOffIcon /> : <VisibilityIcon />}</>
              </VisibilityButton>

              <button onClick={handleLogin}>
                <span>login</span>
              </button>
            </form>
            {/* <div className="banner">
              <div className="bannerContent">
                Not registered? <Link to="#">Sign up</Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
