import {Button} from "react-bootstrap";
import { useState,useEffect } from "react";
import {
    BrowserRouter as Router,
    useNavigate,
} from "react-router-dom";
import { useSearchParams, useLocation } from "react-router-dom";

const CID = '61fa6488efb0c2efd0d03b6e';

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
            .then((response) => {
                if(!response.ok) throw new Error(response.status);
                else return response.json();
              })
            .then((data) => {
                // console.log(response);
                localStorage.setItem("user", JSON.stringify(data.userinfo));
                navigate('/info');
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        }
        
    },[])
    return(
        <div className="mx-auto w-fit mt-4">
        <Button variant="outline-dark" size="sm" onClick={()=>{window.location.href="http://localhost:3000/auth?client_id="+CID+"&response_type=code&state=123abc&redirect_uri=localhost:9000&scope=profile"}}>SignUp With AuthPoint</Button>
        </div>
    )
};