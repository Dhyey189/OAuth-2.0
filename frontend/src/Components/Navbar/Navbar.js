import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import "./Navbar.css";

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
    <nav className="navbar">
      <div className="brand">
        <h2>OAuth 2.0</h2>
        <Link className="nav-link" to="/get-clientid">
          Get Client ID
        </Link>
        <Link className="nav-link" to="/docs">
          Docs
        </Link>
      </div>
      <div className="content-right">
        {user ? (
          <>
            <div className="text-2xl text-slate-300 mr-3">{user.name}</div>
            <Button className="mr-3"variant="dark" onClick={logout}>
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
  );
}
