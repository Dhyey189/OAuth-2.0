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
import "./Signup.css";
import ReactCodeInput from "react-verification-code-input";
import { Button } from "react-bootstrap";


export default function Signup() {
  const query = new URLSearchParams(useLocation().search);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [DOB, setDOB] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [city, setCity] = useState(null);
  const [otp, setotp] = useState(null);
  const [nametag, setnametag] = useState(false);
  const [emailtag, setemailtag] = useState(false);
  const [tag, settag] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
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
    if (name === "" || name === null) {
      err["name"] = "name cannot be empty!";
      err_count = err_count + 1;
    }
    else if (name.length < 3) {
      err["name"] = "name should contain atleast 3 characters!!";
      err_count = err_count + 1;
    }
    setErrors(err);
    if (err_count > 0)
      return;
    setemailtag(true);
    setnametag(true);
    const user = {
      email: email,
      should_exist: false
    };
    console.log(user);
    fetch("http://localhost:8000/accounts/generatecode", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          let err = {}
          console.log(data.error);
          settag(false);
          err["signup"] = data.error;
          setErrors(err);
        }
        else {
          setemailtag(false);
          setnametag(false);
          settag(true);
        }
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  



  const signup = (e) => {
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
    if(err_count > 0)return;
    const user = {
      name: name,
      email: email,
      otp: otp,
      dob:DOB,
      occupation:occupation,
      city: city,
      mobile: mobile
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
        if(!data.success){
          setErrors({"signup":"Invalid Otp!"});
          // settag(false);
        }
        else{
          localStorage.setItem("user", JSON.stringify(data.user));
          if(query.get('backto')){
            // navigate("/"+query.get('backto')+'?client_id='+query.get('client_id')+'&response_type='+query.get('response_type')
            // +'&state='+query.get('state')+'&redirect_uri='+query.get('redirect_uri')+'&scope='+query.get('scope'))
            const backto = query.get('backto')
            query.delete('backto');
            navigate("/"+backto+"?"+query);
          }
          else
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="box">
      <div className="font-medium leading-tight text-2xl mt-0 mb-6 text-blue-500 ">
        Sign Up
      </div>
      <div className="signup">
        {!tag ? <><input
          type="text"
          className="inbox1"
          readOnly={tag}
          placeholder="Name"
          id="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <p class="text-right mr-6 text-red-500 text-m italic">{errors["name"]}</p>
        <input
          className="inbox1"
          type="email"
          readOnly={tag}
          placeholder="Email"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <p class="text-right mr-6 text-red-500 text-m italic ">{errors["email"]}</p>
        <div className="flex">
        <input
          className="inbox1"
          type="text"
          readOnly={tag}
          placeholder="occupation"
          id="occupation"
          onChange={(e) => {
            setOccupation(e.target.value);
          }}
        />
        <p class="text-right mr-6 text-red-500 text-m italic ">{errors["email"]}</p>
        <input
          className="inbox1"
          type="date"
          readOnly={tag}
          placeholder="Date of Birth"
          id="DOB"
          onChange={(e) => {
            setDOB(e.target.value);
          }}
        />
        <p class="text-right mr-6 text-red-500 text-m italic ">{errors["email"]}</p>
        </div>
        <div className="flex">

        <input
          className="inbox1"
          type="text"
          readOnly={tag}
          placeholder="Home city"
          id="city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <p class="text-right mr-6 text-red-500 text-m italic ">{errors["email"]}</p>
        <input
          className="inbox1"
          type="text"
          readOnly={tag}
          placeholder="mobile"
          id="mobile"
          onChange={(e) => {
            setMobile(e.target.value);
          }}
        />
        <p class="text-right mr-6 text-red-500 text-m italic ">{errors["email"]}</p>
        </div>
        <div className="flex">
        
        </div>
        {/* <Button
          className="button-otp"
          type="submit"
          onClick={sendcode}
          disabled={tag}
        >
          send code
        </Button> */}
        <div className="flex justify-center mb-6">
            <button type="submit" disabled={tag} onClick={sendcode}  className=" w-26 bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 border border-blue-700 rounded">
              Get Code
            </button>
        </div></>
        :null
        }
        {tag ? (
          <>
            <input
              className="inbox1"
              type="text"
              placeholder="Enter Code"
              onChange={(e) => {
                setotp(e.target.value);
              }}
            />
            <p class="text-right mr-6 text-red-500 text-m italic">{errors["otp"]}</p>
            <div className="flex justify-center">
            <button type="submit" onClick={signup}  className=" w-26 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded">
              <span>  Sign Up  </span>
            </button>
        </div>
          </>
        ) : null}
        <p class="text-center mr-6 text-red-400 font-bold text-m italic">{errors["signup"]}</p>
        <div className="text-m">
        have an account Login     
        <Link to={`/login?${query}`} className="ml-2 no-underline text-blue-500">
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
