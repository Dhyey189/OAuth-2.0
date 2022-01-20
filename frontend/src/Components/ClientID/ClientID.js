import React, {useState} from 'react'
import {Button} from "react-bootstrap";
import "./ClientID.css"

export default function ClientID() {
    const [appname, setAppName] = useState(null);
    const [homeURL, setHomeURL] = useState(null);
    const [disc, setDisc] = useState(null);
    const [callbackURL, setCallbackURL] = useState(null);
    const [tag, setTag] = useState(false);
    return (
        <div className = "client-application">
            <input
            type="text"
            readOnly={tag}
            placeholder="Application Name"
            id="application"
            className="inbox email"
            onChange={(e) => {
              setAppName(e.target.value);
            }}
          />
          <input
            type="text"
            readOnly={tag}
            placeholder="Home URL"
            id="home-url"
            className="inbox email"
            onChange={(e) => {
              setHomeURL(e.target.value);
            }}
          />
          <input
            type="text"
            readOnly={tag}
            placeholder="application discription"
            id="disc"
            className="inbox email"
            onChange={(e) => {
              setDisc(e.target.value);
            }}
          />
          <input
            type="text"
            readOnly={tag}
            placeholder="callback URL"
            id="callback-url"
            className="inbox email"
            onChange={(e) => {
              setCallbackURL(e.target.value);
            }}
          />
          <Button>Submit</Button>
        </div>
    )
}
