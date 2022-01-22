import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar,Container,Nav,NavDropdown,Button} from 'react-bootstrap';
import './Navbar.css'

export default function Navigation() {
    return (
        <nav className="navbar">
            <div className="brand">
                <h2>OAuth 2.0</h2>
                <Link className="nav-link" to="/get-clientid">Get Client ID</Link>
            </div>
            <div className="content-right">
                <Link className="nav-link" to="/signup"><Button variant="light">Signup</Button></Link>
                <Link className="nav-link" to="/login"><Button variant="dark">Login</Button></Link>
            </div>
        </nav>   
    )
}
