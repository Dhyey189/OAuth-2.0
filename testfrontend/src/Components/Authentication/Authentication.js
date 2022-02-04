import {Button} from "react-bootstrap";
import { useState,useEffect } from "react";
import {
    BrowserRouter as Router,
    useNavigate,
} from "react-router-dom";
import { useSearchParams, useLocation } from "react-router-dom";
// client_id = 61fa6488efb0c2efd0d03b6e
// client_secret = 904ba37a0790044
export default function Auth() {
    const [user, setUser] = useState();
    let navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    useEffect(() => {
        if(query.get('code')) {
            fetch("http://localhost:8001/auth/auth", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({'code':query.get('code')}),
            })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data.userinfo));
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        }
        
    },[])
    return(
        <div className="mx-auto w-fit mt-4">
        <Button variant="outline-dark" size="sm" onClick={()=>{window.location.href="http://localhost:3000/auth?client_id=61fa6488efb0c2efd0d03b6e&response_type=code&state=123abc&redirect_uri=localhost:9000&scope=profile"}}>SignUp With OAuth2.0</Button>
        {/* <h1> {(JSON.parse(localStorage.getItem("user"))).name} </h1>
        <h1> {(JSON.parse(localStorage.getItem("user"))).email} </h1> */}
        </div>
    )
};