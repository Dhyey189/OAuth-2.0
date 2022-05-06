import {Button} from "react-bootstrap";
export default function Information() {
    function logout(){
       localStorage.removeItem('user');
       window.location.href="http://localhost:9000";
    }
    return(
        <div className="div-auth font-class">
        {(JSON.parse(localStorage.getItem("user")))?
        <ul class="list-group">
        <li class="list-group-item"><b>Name&emsp;&emsp;:</b> {(JSON.parse(localStorage.getItem("user"))).name}</li>
      
        <li class="list-group-item list-group-item-primary"><b>email&emsp;&emsp;:</b> {(JSON.parse(localStorage.getItem("user"))).email} </li>
        <li class="list-group-item list-group-item-primary"><b>Mobile&emsp;  :</b> {(JSON.parse(localStorage.getItem("user"))).mobile} </li>

        </ul>
        :null}
        <Button className="logoutbtn-auth" variant="outline-dark" size="sm" onClick={logout}>Logout</Button>
        </div>
    )
}
