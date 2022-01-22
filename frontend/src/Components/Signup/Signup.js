import React, { useState } from "react";
import {Link} from "react-router-dom"
import "./Signup.css";
import ReactCodeInput from "react-verification-code-input";
import { Button } from "react-bootstrap";
export default function Signup() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [otp, setotp] = useState(null);
  const [nametag, setnametag] = useState(false);
  const [emailtag, setemailtag] = useState(false);
  const sendcode = (e) => {
    e.preventDefault();
    setemailtag(true);
    setnametag(true);
    const user = {
      email: email,
    };
    console.log(user);
    setemailtag(false);
    setnametag(false);
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
  const signup = (e) => {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
      otp: otp,
    };
    fetch("http://localhost:8000/accounts/signup", {
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
      <div className="signup">
        <input
          type="text"
          className = "inbox"
          readOnly={nametag}
          placeholder="your name"
          id="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className = "inbox"
          type="email"
          readOnly={emailtag}
          placeholder="email"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button className="button-otp" type="submit" onClick={sendcode}>
          send code
        </Button>
        <input
          className = "inbox"
          type="text"
          placeholder="your otp"
          onChange={(e) => {
            setotp(e.target.value);
          }}
        />
        <Button type="submit" onClick={signup}>
          Signup
        </Button>
        <Link to="/" className="link">
          <span className="fa fa-arrow-left icon"></span>back
        </Link>
      </div>
    </div>
  );
}
