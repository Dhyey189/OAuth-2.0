import { React, useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import Body from '../Body/Body'
import "./Navbar.css";
import pic from './UTH1.png'
export default function Navigation() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      setUser(JSON.parse(localStorage.getItem("user")));
      console.log(user);
    }
  }, []);
  console.log(user);

  const logout = (e) => {
    e.preventDefault();
    console.log("logout");
    setUser(null);
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
    <nav className="navbar">
      <div className="brand">
        <NavLink to="/" className="nav-link"><img className='h-12' src={pic}></img></NavLink>
        <NavLink className="nav-link tracking-wide"  to="/developer">
          Devloper Profile
        </NavLink>
        <Link className="nav-link tracking-wide" to="/docs">
          Docs
        </Link>
      </div>
      <div className="content-right">
        {user ? (
          <>
            <div className="text-2xl text-slate-300 mr-3">{user.name}</div>
            <Button className="mr-3" variant="dark" onClick={logout}>
              logout
            </Button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/signup">
              <Button variant="light">Signup</Button>
            </Link>
            <Link className="nav-link" to="/login">
              <Button variant="dark">Login</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
    </>
  );
}
