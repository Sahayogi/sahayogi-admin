import './App.css';
// import { MetaMaskProvider } from 'metamask-react';
import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About'
import Home from './pages/Home'
import Donate from './pages/Donate';
import Beneficiary from './pages/Beneficiary';
import Vendor from './pages/Vendor';
import Logout from './pages/Logout';
import Navbar from './components/navbar/Navbar';


const App = () => {
  return (
    // <MetaMaskProvider>
     <div className="App">
      <Router>
        <Sidebar />
        <Navbar/>
        <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/about" element={<About/>}/>
         <Route path="/donate" element={<Donate/>}/>
         <Route path="/Beneficiary" element={<Beneficiary/>}/>
         <Route path="/Vendor" element={<Vendor/>}/>
         <Route path="/logout" element={<Logout/>}/>
        </Routes>

      </Router>


    </div>
    // </MetaMaskProvider>
   
  );
}

export default App;
