import React from 'react'
import {Link} from 'react-router-dom'
export default function Navbar() {
    return (
        <nav className="">
            <h1>OAuth 2.0</h1>
            <Link to="/signup">Signup</Link><br/>
            <Link to="/login">Login</Link>
        </nav>
    )
}
