import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar.js'
import Signup from './Components/Signup/Signup.js'
import Login from './Components/Login/Login.js'
import Auth from './Components/Auth/Auth.js';
import Docs from './Components/Docs/Docs'
import Error from './Components/Error/Error.js';
import Developer from './Components/Developer/Developer'
import Body from'./Components/Body/Body'
import './App.css';

function App() {
  return (
    <>
    <Router>
      <Routes>        
            <Route path="/" element={<><Navbar/><Body /></>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/developer" element={<><Navbar/><Developer /></>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/docs" element={<><Navbar/><Docs /></>} />
            <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
    </>
    );
}

export default App;
