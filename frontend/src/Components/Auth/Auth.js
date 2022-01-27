import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useNavigate,
    useLocation
} from "react-router-dom";

export default function Auth() {
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("user") == null) {
            console.log('in if')
            navigate('/login');
        }
    }, [])
    const sendAuthCodeAndRedirect = (e) => {
        e.preventDefault();
        const body = {
            client_id: "61e9440db46ca1d4eebe0f64",
            user_id: "61dc128170a1cbbc2d95f710",
            state: "Hello"
            
        }
        fetch("http://localhost:8000/oauth/authorization-code", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    return (
        <div>
            This site wants your basic information for authentication
            <button onClick={sendAuthCodeAndRedirect}>Allow</button>
            <button >Deny</button>
        </div>
    );
}
