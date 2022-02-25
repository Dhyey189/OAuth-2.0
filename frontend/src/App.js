import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar.js'
import Signup from './Components/Signup/Signup.js'
import Login from './Components/Login/Login.js'
import ClientID from './Components/ClientID/ClientID.js';
import Auth from './Components/Auth/Auth.js';
import Docs from './Components/Docs/Docs'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
            <Route path="/" element={<Navbar/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/get-clientid" element={<ClientID />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/docs" element={<Docs />} />
      </Routes>
    </Router>
    );
}

export default App;
