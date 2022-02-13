import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
// import { MetaMaskProvider } from 'metamask-react';

import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

import Home from "./pages/Home";
import Settings from "./pages/Settings";

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

import NotFound from "./pages/NotFound";
import Logout from "./pages/Logout";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Sidebar />
        <Home />
        <Routes>
          {/* aid agency */}
          <Route exact path="/aidAgency" element={<AidAgency />} />
          <Route path="/addAgency" element={<AddAgency />} />
          {/* project */}
          <Route path="/donate" element={<Projects />} />
          <Route path="/addProject" element={<AddProject />} />
          {/* bank */}
          <Route path="/bank" element={<Bank />} />
          <Route path="/addBank" element={<AddBank />} />
          {/* beneficiary */}
          <Route path="/beneficiary" element={<BeneficiaryList />} />
          <Route path="/addBeneficiary" element={<AddBeneficiary />} />
          {/* vendors */}
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/addVendor" element={<AddVendor />} />
          {/* transactions */}
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
