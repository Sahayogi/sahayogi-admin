import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { MetaMaskProvider } from 'metamask-react';

import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

import AidAgency from "./pages/aidAgency/AidAgency";
import Projects from "./pages/project/Projects";
import Bank from "./pages/bank/Bank";
import BeneficiaryList from "./pages/beneficiary/BeneficiaryList";
import Vendor from "./pages/vendor/Vendor";

import Transaction from "./pages/transaction/Transaction";

import AddBeneficiary from "./pages/beneficiary/AddBeneficiary";
import AddAgency from "./pages/aidAgency/AddAgency";
import AddVendor from "./pages/vendor/AddVendor";
import AddProject from "./pages/project/AddProject";
import AddBank from "./pages/bank/AddBank";



//  Context API for the data throughout the app
import {Provider as AuthProvider} from './context/UserContext'
export const DetailContext = React.createContext();

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [notification, setNotification] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);
  return (
     <AuthProvider>
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
          <div className="container">
            {!isLoginActive && <Sidebar />}
            <Routes>
              <Route  path="/" element={<Login />} />
              <Route exact path="/home" element={<Home />} />
              {/* aid agency */}
              <Route exact path="/aidAgency" element={<AidAgency />} />
              <Route exact path="/addAgency" element={<AddAgency />} />
              {/* project */}
              <Route exact path="/donate" element={<Projects />} />
              <Route exact path="/addProject" element={<AddProject />} />
              {/* bank */}
              <Route exact path="/bank" element={<Bank />} />
              <Route exact path="/addBank" element={<AddBank />} />
              {/* beneficiary */}
              <Route exact path="/beneficiary" element={<BeneficiaryList />} />
              <Route exact path="/addBeneficiary" element={<AddBeneficiary />} />
              {/* vendors */}
              <Route exact path="/vendor" element={<Vendor />} />
              <Route exact path="/addVendor" element={<AddVendor />} />
              {/* transactions */}
              <Route exact path="/transaction" element={<Transaction />} />
              <Route exact path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
              <Route exact path="/logout" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </div>
    </DetailContext.Provider>
    </AuthProvider>
  );
};

export default App;
