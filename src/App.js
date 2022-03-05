import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import { MetaMaskProvider } from 'metamask-react';

import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';

import Home from './pages/Home';
import Settings from './pages/Settings';

import AidAgency from './pages/aidAgency/AidAgency';
import Projects from './pages/project/Projects';
import Bank from './pages/bank/Bank';
import BeneficiaryList from './pages/beneficiary/BeneficiaryList';
import Vendor from './pages/vendor/Vendor';

import ProjectDetail from './pages/project/ProjectDetail';

import Transaction from './pages/transaction/Transaction';

import AddBeneficiary from './pages/beneficiary/AddBeneficiary';
import AddAgency from './pages/aidAgency/AddAgency';
import AddVendor from './pages/vendor/AddVendor';
import AddProject from './pages/project/AddProject';
import AddBank from './pages/bank/AddBank';

import NotFound from './pages/NotFound';
import Logout from './pages/Logout';
import RaiseFund from './pages/admin/RaiseFund';
import Operations from './pages/admin/Operations';
import BeneOperation from './pages/aidAgency/BeneOperation';

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <div className='container'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          {/* aid agency */}
          <Route exact path='/aidAgency' element={<AidAgency />} />
          <Route exact path='/addAgency' element={<AddAgency />} />
          {/* project */}
          <Route exact path='/projects' element={<Projects />} />
          <Route exact path='/addProject' element={<AddProject />} />
          <Route exact path='/projects/:id' element={<ProjectDetail />} />
          {/* bank */}
          <Route exact path='/bank' element={<Bank />} />
          <Route exact path='/addBank' element={<AddBank />} />
          {/* beneficiary */}
          <Route exact path='/beneficiary' element={<BeneficiaryList />} />
          <Route exact path='/addBeneficiary' element={<AddBeneficiary />} />
          {/* vendors */}
          <Route exact path='/vendor' element={<Vendor />} />
          <Route exact path='/addVendor' element={<AddVendor />} />
          {/* transactions */}
          <Route exact path='/transaction' element={<Transaction />} />
          <Route exact path='/settings' element={<Settings />} />
          <Route exact path='/logout' element={<Logout />} />
          <Route exact path='/raisefund' element={<RaiseFund />} />
          <Route exact path='/operations' element={<Operations />} />
          <Route exact path='/beneoperations' element={<BeneOperation />} />


          <Route exact path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
