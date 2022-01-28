import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    useNavigate,
} from "react-router-dom";
import { useSearchParams, useLocation} from "react-router-dom";

import {Button} from "react-bootstrap";
import "./Auth.css"
export default function Auth() {
    let navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    useEffect(() => {
        if (localStorage.getItem("user") == null) {
            console.log('in if')
            navigate('/login');
        }
    }, [])
    const sendAuthCodeAndRedirect = (e) => {
        e.preventDefault();
        console.log(query.get('redirecturl'));
        const body = {
            client_id: query.get('client_id'),
            user_id: JSON.parse(localStorage.getItem("user"))._id,
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
                window.location.href="https://"+query.get('redirecturl')+"?code="+data.authorizationcode;
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    return (
        <div className="mx-auto w-fit mt-4">
            <div className="text-xl">This site wants your basic information for authentication</div>
            <div className="mx-auto w-fit mt-2"><Button className="mr-5" onClick={sendAuthCodeAndRedirect} size="sm">Allow</Button>
            <Button variant="outline-dark" size="sm">Deny</Button></div>
        </div>
    );
}
