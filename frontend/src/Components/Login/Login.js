import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import ReactCodeInput from "react-verification-code-input";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Button } from "react-bootstrap";

export default function Signup() {
  const [email, setEmail] = useState(null);
  const [otp, setotp] = useState(null);
  const [emailtag, setemailtag] = useState(false);
  // const [openOTP, setOpenOTP] = useState(false);

  const sendcode = (e) => {
    // setOpenOTP(true);
    e.preventDefault();
    setemailtag(true);
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
          readOnly={emailtag}
          placeholder="email"
          id="email"
          className="inbox email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button className="button-otp" type="submit" onClick={sendcode}>
          Get Code
        </Button>
        <input
          type="text"
          placeholder="your otp"
          className="inbox otp"
          onChange={(e) => {
            setotp(e.target.value);
          }}
        />
        <Button type="submit" onClick={login} className="">
          <span>Login</span>
        </Button>
        <Link to="/" className="link">
          <span className="fa fa-arrow-left icon"></span>back
        </Link>
      </div>
    </div>
  );
}
