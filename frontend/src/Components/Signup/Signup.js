import React, { useState } from 'react'
import './Signup.css'
export default function Signup() {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmpassword, setConfirmPassword] = useState(null);
    const signup = (e) =>{
        e.preventDefault();
        const user = {
            name:name,email:email,password:password
        }
        fetch('http://localhost:8000/accounts/signup',{
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
            <input type="text" placeholder="your name" id="name" onChange={(e) => { setName(e.target.value) }} />
            <input type="email" placeholder="email" id="email" onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" placeholder="password" id="password" onChange={(e) => { setPassword(e.target.value) }} />
            <input type="password" placeholder="confirm password" id="password" onChange={(e) => { setConfirmPassword(e.target.value) }} />
            <button type="submit" onClick={signup}>Signup</button>
        </div>
    )
}
