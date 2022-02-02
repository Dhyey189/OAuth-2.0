import {Button} from "react-bootstrap";
import { useEffect } from "react";
import {
    BrowserRouter as Router,
    useNavigate,
} from "react-router-dom";
import { useSearchParams, useLocation } from "react-router-dom";
// client_id = 61fa6488efb0c2efd0d03b6e
// client_secret = 904ba37a0790044
export default function Auth() {
    let navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    useEffect(() => {
        if(query.get('code')){
            console.log(query.get('code'));
        }
        
    },[])
    return(

        <div className="mx-auto w-fit mt-4">
        <Button variant="outline-dark" size="sm" onClick={()=>{window.location.href="http://localhost:3000/auth?client_id=61fa6488efb0c2efd0d03b6e&response_type=code&state=123abc&redirect_uri=localhost:9000&scope=profile"}}>SignUp With OAuth2.0</Button>
        </div>
    )
};