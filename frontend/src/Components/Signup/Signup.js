import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import ReactCodeInput from "react-verification-code-input";
import { Button } from "react-bootstrap";


export default function Signup() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [otp, setotp] = useState(null);
  const [nametag, setnametag] = useState(false);
  const [emailtag, setemailtag] = useState(false);
  const [tag, settag] = useState(false);
  
  const navigate = useNavigate();
  
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
    settag(true);
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
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
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
          className="inbox1"
          readOnly={tag}
          placeholder="your name"
          id="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className="inbox1"
          type="email"
          readOnly={tag}
          placeholder="email"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button
          className="button-otp"
          type="submit"
          onClick={sendcode}
          disabled={tag}
        >
          send code
        </Button>
        {tag ? (
          <>
            <input
              className="inbox1"
              type="text"
              placeholder="your otp"
              onChange={(e) => {
                setotp(e.target.value);
              }}
            />
            <Button type="submit" onClick={signup}>
              Signup
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
