import react from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar.js'
import Signup from './Components/Signup/Signup.js'
import Login from './Components/Login/Login.js'
import ClientID from './Components/ClientID/ClientID.js';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
            <Route path="/" element={<Navbar/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/get-clientid" element={<ClientID />} />
          </Routes>
    </Router>
    );
}

export default App;
