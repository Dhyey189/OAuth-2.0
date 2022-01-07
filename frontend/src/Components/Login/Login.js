import React, { useState } from 'react'
import './Login.css'
export default function Signup() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmpassword, setConfirmPassword] = useState(null);

    const login = (e) =>{
        e.preventDefault();
        const user = {
            email:email,password:password
        }
        fetch('http://localhost:8000/accounts/login',{
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(data => {

            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    return (
        <div className="signup">
            <input type="email" placeholder="email" id="email" onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" placeholder="password" id="password" onChange={(e) => { setPassword(e.target.value) }} />
            <button type="submit" onClick={login}>Login</button>
        </div>
    )
}
