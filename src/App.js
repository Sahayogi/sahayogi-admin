import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About'
import Home from './pages/Home'
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Setting from './pages/Setting';
import Logout from './pages/Logout';
import Navbar from './components/navbar/Navbar';

const App = () => {
  return (
    <div className="App">
      <Router>
      
        <Sidebar />
        <Navbar/>
        {/* <Dashboard /> */}
        <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/about" element={<About/>}/>
         <Route path="/donate" element={<Donate/>}/>
         <Route path="/contact" element={<Contact/>}/>
         <Route path="/setting" element={<Setting/>}/>
         <Route path="/logout" element={<Logout/>}/>
        </Routes>

      </Router>


    </div>
  );
}

export default App;
