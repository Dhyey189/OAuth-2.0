import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import './App.css';
import Authentication from './Components/Authentication/Authentication';

function App() {
  return (
    <Router>
      <Routes>
            <Route path="/" element={<Authentication/>} />
      </Routes>
    </Router>
  );
}

export default App;
