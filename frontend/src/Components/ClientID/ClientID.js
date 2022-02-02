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

  const register = (e) => {
    e.preventDefault();
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
    <div className="client-application">
      <input
        type="text"
        readOnly={tag}
        placeholder="Application Name"
        id="application"
        className="inbox1 email"
        onChange={(e) => {
          setAppName(e.target.value);
        }}
      />
      <input
        type="text"
        readOnly={tag}
        placeholder="Home URL"
        id="home-url"
        className="inbox1 email"
        onChange={(e) => {
          setHomeURL(e.target.value);
        }}
      />
      <input
        type="text"
        readOnly={tag}
        placeholder="application discription"
        id="disc"
        className="inbox1 email"
        onChange={(e) => {
          setDisc(e.target.value);
        }}
      />
      <input
        type="text"
        readOnly={tag}
        placeholder="callback URL"
        id="callback-url"
        className="inbox1 email"
        onChange={(e) => {
          setCallbackURL(e.target.value);
        }}
      />
      <Button onClick={register} disabled={tag}>
        Register
      </Button>
      <Link to="/" className="link">
        <span className="fa fa-arrow-left icon"></span>back
      </Link>
      {tag ? (
        <div className="details">
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
  );
}
