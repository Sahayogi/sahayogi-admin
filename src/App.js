import "./App.css";
import React, { useState, useContext } from "react";
// import { MetaMaskProvider } from 'metamask-react';
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import Beneficiary from "./pages/Beneficiary";
import Vendor from "./pages/Vendor";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import Navbar from "./components/navbar/Navbar";

//  Context API for the data throughout the app
export const DetailContext = React.createContext();

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [notification, setNotification] = useState(false);
  return (
    // <MetaMaskProvider>
    <DetailContext.Provider
      value={{ notification, setNotification, loginStatus, setLoginStatus }}
    >
      <div className="App">
        <Router>
          <Sidebar />
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/beneficiary" element={<Beneficiary />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/logout" element={<Login />} />
           
          </Routes>
        </Router>
      </div>
    </DetailContext.Provider>
    // </MetaMaskProvider>
  );
};

export default App;
