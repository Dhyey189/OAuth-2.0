import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    useNavigate,
} from "react-router-dom";
import { useSearchParams, useLocation } from "react-router-dom";

import { Button } from "react-bootstrap";
import "./Auth.css"
import pic from './UTH2.png'

// https:/localhost:3000/auth/?client_id=a17c21ed
// &response_type=code
// &state=5ca75bd30
// &redirect_uri=https%3A%2F%2Fexample-app.com%2Fauth
// &scope=photos
export default function Auth() {
    let navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const [applicationName, setApplicationName] = useState("");
    const [applicationUrl, setApplicationUrl] = useState("");

    useEffect(() => {
        if (localStorage.getItem("user") == null) {
            navigate('/login?client_id=' + query.get('client_id') + '&response_type=' + query.get('response_type')
                + '&state=' + query.get('state') + '&redirect_uri=' + query.get('redirect_uri') + '&scope=' + query.get('scope') + '&backto=auth');
        }
        let clid = query.get('client_id');
        if (clid && query.get('redirect_uri')) {
            fetch("http://localhost:8000/application/get-client", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ client_id: clid }),
            })
            .then((response) => response.json())
            .then((data) => {
                if(!data.success){
                    if (query.get('redirect_uri'))
                        window.location.href = "http://" + query.get('redirect_uri') + "?error="+data.error;
                    else
                        navigate('/error');
                }
                if(data.callbackurl !== "http://" + query.get('redirect_uri') + '/'){
                    navigate('/error');
                }
                setApplicationName(data.applicationname);
                setApplicationUrl(data.homepageurl);
            })
            .catch((error) => {
                console.error("Error:", error);
                if (query.get('redirect_uri'))
                    window.location.href = "http://" + query.get('redirect_uri') + "?error=somethingwrong";
                else
                    navigate('/error');
            });
        }
        else {
            if (query.get('redirect_uri'))
                window.location.href = "http://" + query.get('redirect_uri') + "?error=incompletedetails";
            else
                navigate('/error');
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
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then((response) => response.json())
        .then((data) => {
            if(!data.success){
                if (query.get('redirect_uri'))
                    window.location.href = "http://" + query.get('redirect_uri') + "?error="+data.error;
                else
                    navigate('/error');
            }
            window.location.href = "http://" + query.get('redirect_uri') + "?code=" + data.authorizationcode + "&response=allowed";
        })
        .catch((error) => {
            console.error("Error:", error);
            if (query.get('redirect_uri'))
                window.location.href = "http://" + query.get('redirect_uri') + "?error=somethingwrong";
            else
                navigate('/error');
        });
    }

    const doNotSendAuthCodeAndRedirect = (e) => {
        e.preventDefault();
        window.location.href = "http://" + query.get('redirect_uri') + "?response=denied";
    }

    return (
        <div className="absolute inset-0 w-fit h-fit my-auto box ">
            <img className="h-14 mb-6" src={pic}></img>
            <div className="text-xl"><a href={applicationUrl}>{applicationName}</a> wants your basic information for authentication</div>
            <div className="mx-auto w-fit mt-2"><Button className="mr-5" onClick={sendAuthCodeAndRedirect} size="sm">Allow</Button>
                <Button variant="outline-dark" size="sm" onClick={doNotSendAuthCodeAndRedirect}>Deny</Button>
            </div>
        </div>
    );
}
