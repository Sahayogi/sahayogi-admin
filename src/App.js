import "./App.css";
import React, { useState, useContext } from "react";
// import { MetaMaskProvider } from 'metamask-react';
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transaction from "./pages/Transaction";
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import BeneficiaryList from "./pages/BeneficiaryList";
import Vendor from "./pages/Vendor";
import AidAgency from "./pages/AidAgency";
import Login from "./pages/Login";
import Navbar from "./components/navbar/Navbar";
import AddBeneficiary from "./pages/AddBeneficiary";

//  Context API for the data throughout the app
export const DetailContext = React.createContext();

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [notification, setNotification] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);
  return (
    // <MetaMaskProvider>
    <DetailContext.Provider
      value={{
        notification,
        setNotification,
        loginStatus,
        setIsLoginActive,
        setLoginStatus,
      }}
    >
      <div className="App">
        <Router>
          {!isLoginActive && <Navbar />}
          <div className="container">{!isLoginActive && <Sidebar />} 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aidAgency" element={<AidAgency />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/beneficiary" element={<BeneficiaryList />} />
            <Route path="/addBeneficiary" element={<AddBeneficiary />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/logout" element={<Login />} />
          </Routes>
       
          </div>
        
        </Router>
      </div>
    </DetailContext.Provider>
    // </MetaMaskProvider>
  );
};

export default App;
