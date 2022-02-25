import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import './App.css';
import Authentication from './Components/Authentication/Authentication';
import Information from "./Components/Information/Information";

function App() {
  return (
    <Router>
      <Routes>
            <Route path="/" element={<Authentication/>} />
            <Route path="/info" element={<Information/>} />
      </Routes>
    </Router>
  );
}

export default App;
