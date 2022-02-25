import {Button} from "react-bootstrap";
export default function Information() {
    function logout(){
       localStorage.removeItem('user');
       window.location.href="http://localhost:9000";
    }
    return(
        <div>
        {(JSON.parse(localStorage.getItem("user")))?
        <ul class="list-group">
        <li class="list-group-item">{(JSON.parse(localStorage.getItem("user"))).name}</li>
      
        <li class="list-group-item list-group-item-primary"> {(JSON.parse(localStorage.getItem("user"))).email} </li>
        </ul>
        :null}
        <Button variant="outline-dark" size="sm" onClick={logout}>Logout</Button>
        </div>
    )
}
