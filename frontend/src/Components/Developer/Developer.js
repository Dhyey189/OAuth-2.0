import React,{ useState, useEffect} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useNavigate,
    useLocation,
  } from "react-router-dom";

export default function Developer() {
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("user") == null){
            navigate('/login?backto=developer');
        }
    },[])
    return (
        <div>Developer</div>
    )
}
