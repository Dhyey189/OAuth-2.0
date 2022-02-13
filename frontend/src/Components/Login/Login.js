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
import OtpInput from 'react-otp-input';
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
  const [errors, setErrors] = useState({});
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }; 
  const sendcode = (e) => {
    e.preventDefault();
    let err = {};
    let err_count = 0;
    if (!validateEmail(email)) {
      err["email"] = "invalid email format!";
      err_count = err_count + 1;
    }
    setErrors(err);
    if (err_count > 0)
      return;
    const user = {
      email: email,
      should_exist:true
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
        if(!data.success) {
          let err = {};
          console.log(data.error);
          settag(false);
          err["login"] = data.error;
          setErrors(err);
        }
        else{
          setemailtag(true);
          settag(true);
        }
        console.log("Not verified Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const login = (e) => {
    e.preventDefault();
    let err = {};
    let err_count = 0;
    if(otp === "" || otp === null){
      err["otp"] = "code cannot be empty!";
      err_count++;
    }
    else if(otp.length < 4){
      err["otp"] = "code should contain at least 4 digits!";
      err_count++;
    }
    setErrors(err);
    if(err_count>0)return;
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
      <div className="font-medium leading-tight text-2xl mt-0 mb-6 text-blue-500 ">
        Login
      </div>
      <div className="login">
      { !tag ?
      <>
        <input
          type="email"
          readOnly={tag}
          placeholder="Email"
          id="email"
          className="inbox1 email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        
        <p class="text-right mr-6 text-red-500 text-m italic ">{errors["email"]}</p>
        <div className="flex justify-center mb-6">
            <button type="submit" onClick={sendcode}  className=" w-26 bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 border border-blue-700 rounded">
              Get Code
            </button>
        </div>
        </>:null
      }
        {tag ? (
          <>
            <input
              type="text"
              placeholder="Enter Code"
              className="inbox1 otp"
              onChange={(e) => {
                setotp(e.target.value);
              }}
            />
            <p class="text-right mr-6 text-red-500 text-m italic ">{errors["otp"]}</p>
              {/* <OtpInput
          onChange={(e) => {
            setotp(e.target.value);
          }}
          numInputs={4}
          separator={<span></span>}
        /> */}
        <div className="flex justify-center">
            <button type="submit" onClick={login}  className=" w-26 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded">
              <span>  Login  </span>
            </button>
        </div>
          </>
        ) : null}
        <p class="text-center mr-6 text-red-400 font-bold text-m italic ">{errors["login"]}</p>
        <div className="text-m">
        don't have an account create    
        <Link to="/signup" className="ml-2 no-underline text-blue-500">
          here
        </Link>
        </div>
        <Link to="/" className="link">
          <span className="mt-4 fa fa-arrow-left icon"></span>back to home page
        </Link>
      </div>
    </div>
  );
}
