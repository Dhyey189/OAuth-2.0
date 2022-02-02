import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./Login.css";
import ReactCodeInput from "react-verification-code-input";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Button } from "react-bootstrap";

export default function Signup() {
  let navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const [email, setEmail] = useState(null);
  const [otp, setotp] = useState(null);
  const [emailtag, setemailtag] = useState(false);
  const [tag, settag] = useState(false);
  // const [openOTP, setOpenOTP] = useState(false);
  const sendcode = (e) => {
    // setOpenOTP(true);
    e.preventDefault();
    setemailtag(true);
    settag(true);
    const user = {
      email: email,
    };
    console.log(user);
    setemailtag(false);
    fetch("http://localhost:8000/accounts/generatecode", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Not verified Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const login = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      otp: otp,
    };
    fetch("http://localhost:8000/accounts/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Verified Success:", data);
        localStorage.setItem("user", JSON.stringify(data.user));
        if(query.get('backto'))
        navigate("/"+query.get('backto')+'?client_id='+query.get('client_id')+'&response_type='+query.get('response_type')
        +'&state='+query.get('state')+'&redirect_uri='+query.get('redirect_uri')+'&scope='+query.get('scope'))
        else
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="box">
      <div className="login">
        <input
          type="email"
          readOnly={tag}
          placeholder="email"
          id="email"
          className="inbox1 email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button className="button-otp" type="submit" onClick={sendcode} disabled={tag}>
          Get Code
        </Button>
        {tag ? (
          <>
            <input
              type="text"
              placeholder="your otp"
              className="inbox1 otp"
              onChange={(e) => {
                setotp(e.target.value);
              }}
            />
            <Button type="submit" onClick={login} className="">
              <span>Login</span>
            </Button>
          </>
        ) : null}
        <Link to="/" className="link">
          <span className="fa fa-arrow-left icon"></span>back
        </Link>
      </div>
    </div>
  );
}
