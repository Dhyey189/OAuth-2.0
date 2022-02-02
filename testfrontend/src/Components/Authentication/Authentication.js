import {Button} from "react-bootstrap";

export default function Auth() {
    return(
        <div className="mx-auto w-fit mt-4">
        <Button variant="outline-dark" size="sm" onClick={()=>{window.location.href="http://localhost:3000/auth"}}>SignUp With OAuth2.0</Button>
        </div>
    )
};