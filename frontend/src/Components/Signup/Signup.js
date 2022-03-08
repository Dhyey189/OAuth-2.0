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
    if(!DOB)
    {
      err["DOB"] = "Can not be empty!";
      err_count = err_count + 1;
    }
    if(!occupation)
    {
      err["occupation"] = "Can not be empty!";
      err_count = err_count + 1;
    }
    if(!city)
    {
      err["city"] = "Can not be empty!";
      err_count = err_count + 1;
    }
    if(!mobile)
    {
      err["mobile"] = "Can not be empty!";
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
    <div className="box absolute inset-0 w-fit h-fit my-auto">
      <div className="font-medium leading-tight text-2xl mt-0 mb-6 text-blue-500 ">
        Sign Up
      </div>
      <div className="signup">
        {!tag ? <>
          <label class=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            First Name
          </label>
        <input
          type="text"
          className="inbox1 w-full"
          readOnly={tag}
          placeholder="Alex"
          id="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <p class="text-right mr-3 text-red-500 text-m italic">{errors["name"]}</p>
        <label class=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            Email
          </label>
        <input
          className="inbox1 w-full"
          type="email"
          readOnly={tag}
          placeholder="alex@gmail.com"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <p class="text-right mr-3 text-red-500 text-m italic ">{errors["email"]}</p>
        <div className="flex justify-between my-2">
        <div className="flex-col w-1/2 mr-2">
        <label class=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            occupation
          </label>
        <input
          className="inbox1 w-full px-1"
          type="text"
          readOnly={tag}
          placeholder="Software Developer"
          id="occupation"
          onChange={(e) => {
            setOccupation(e.target.value);
          }}
        />
        <p class="text-right mr-3 text-red-500 text-m italic ">{errors["occupation"]}</p>
        </div>
        <div className="flex-col w-1/2 ml-2">
        <label class=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            Date of Birth
          </label>
        <input
          className="inbox1 w-full px-1"
          type="date"
          readOnly={tag}
          // placeholder="Date of Birth"
          id="DOB"
          onChange={(e) => {
            setDOB(e.target.value);
          }}
        />
        <p class="text-right mr-3 text-red-500 text-m italic ">{errors["DOB"]}</p>
        </div>
        </div>

        <div className="flex justify-between my-2">
        <div className="flex-col w-1/2 mr-2">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            Home City
          </label>
        <input
          className="inbox1 w-full px-1"
          type="text"
          readOnly={tag}
          placeholder="Ahmedabad"
          id="city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <p class="text-right mr-3 text-red-500 text-m italic ">{errors["city"]}</p>
        </div>

        <div className="flex-col w-1/2 ml-2">
        <label class=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            occupation
          </label>
        <input
          className="inbox1 w-full px-1"
          type="text"
          readOnly={tag}
          placeholder="8888888888"
          id="mobile"
          onChange={(e) => {
            setMobile(e.target.value);
          }}
        />
        <p class="text-right mr-3 text-red-500 text-m italic ">{errors["mobile"]}</p>
        </div>
        </div>
        {/* <div className="flex">
        
        </div> */}
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
              verify and signup
            </button>
        </div></>
        :null
        }
        {tag ? (
          <>
          <p className="italic font-semibold">*Check your Email for OTP</p>
            <input
              className="inbox1 w-full"
              type="text"
              placeholder="Enter Code"
              onChange={(e) => {
                setotp(e.target.value);
              }}
            />
            <p class="text-right mr-3 text-red-500 text-m italic">{errors["otp"]}</p>
            <div className="flex justify-center">
            <button type="submit" onClick={signup}  className=" w-26 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded">
              <span>  Sign Up  </span>
            </button>
        </div>
          </>
        ) : null}
        <p class="text-center mr-3 text-red-400 font-bold text-m italic">{errors["signup"]}</p>
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
