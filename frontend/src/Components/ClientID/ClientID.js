import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./ClientID.css";

export default function ClientID() {
  const [appname, setAppName] = useState(null);
  const [homeURL, setHomeURL] = useState(null);
  const [disc, setDisc] = useState(null);
  const [callbackURL, setCallbackURL] = useState(null);
  const [tag, setTag] = useState(false);
  const [clientID, setClientID] = useState(null);
  const [clientsecret, setClientSecret] = useState(null);
  const [errors, setErrors] = useState({});
  const register = (e) => {
    e.preventDefault();
    let err = {};
    let err_count = 0;
    if(appname === "" || appname === null){
      err["name"] = "application name cannot be empty!";
      err_count++;
    }
    if(homeURL === "" || homeURL === null){
      err["hurl"] = "home url cannot be empty!";
      err_count++;
    }
    if(callbackURL === "" || callbackURL === null){
      err["curl"] = "call back url cannot be empty!";
      err_count++;
    }
    setErrors(err);
    if(err_count > 0)return;
    setTag(true);
    const client = {
      applicationname: appname,
      homepageurl: homeURL,
      discreption: disc,
      callbackurl: callbackURL,
    };
    fetch("http://localhost:8000/application/registerapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    })
      .then((response) => response.json())
      .then((data) => {
        setClientID(data.client._id);
        setClientSecret(data.client.clientsecret);
        console.log("Success :", data);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  return (
    <div className="box ">
      <div className="font-medium leading-tight text-2xl mt-0 mb-6 text-blue-500 ">
        APPLICATION
      </div>
      <div className="signup">
      <input
        type="text"
        readOnly={tag}
        placeholder="Application Name"
        id="application"
        className="inbox1 "
        onChange={(e) => {
          setAppName(e.target.value);
        }}
      />
      <p class="text-right mr-6 text-red-500 text-m italic">{errors["name"]}</p>
      <input
        type="text"
        readOnly={tag}
        placeholder="Home URL"
        id="home-url"
        className="inbox1"
        onChange={(e) => {
          setHomeURL(e.target.value);
        }}
      />
      <p class="text-right mr-6 text-red-500 text-m italic">{errors["hurl"]}</p>
        <input
          type="text"
          readOnly={tag}
          placeholder="Callback URL"
          id="callback-url"
          className="inbox1"
          onChange={(e) => {
            setCallbackURL(e.target.value);
          }}
        />
        <p class="text-right mr-6 text-red-500 text-m italic">{errors["curl"]}</p>
      <input
        type="text"
        readOnly={tag}
        placeholder="Application discription"
        id="disc"
        className="inbox1"
        onChange={(e) => {
          setDisc(e.target.value);
        }}
      />
      <button type="submit" onClick={register} disabled={tag}  className="w-fit mx-auto mb-6  bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded">
        <span>  Create Application  </span>
      </button>
      <Link to="/" className="link">
        <span className="fa fa-arrow-left icon"></span>back to home page
      </Link>
      {tag ? (
        <div className="">
          <div>
            <div className="label">your clientID : </div>
            <span className="value">{clientID}</span>
          </div>
          <br />
          <div>
            <div className="label">your clientsecret : </div>
            <span className="value">{clientsecret}</span>
          </div>
        </div>
      ) : null}
      </div>
    </div>
  );
}
