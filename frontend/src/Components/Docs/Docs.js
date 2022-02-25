import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import './Docs.css'


export default function Docs() {
    return (
        <div className="container">
            <h1 class="text-center fst-italic">OAuth 2.0 Documentation</h1><br />
            <h2>Client Registration</h2><br />
            <p>
                How do developers register a new client application to obtain a client ID and optionally a secret?
            </p>
            Here is a link to the registration page click here to <Link to="/get-clientid">Register </Link><br />
            <p>
                In register application you should enter required information about your application so we can know about your application
                here is the way to provide redirect url and other information you collect about an application, and indicate which pieces of information are shown to the end-user during the authorization request.
            </p>
            <h4>List of information </h4><br/>
            <ol class="list-group list-group-numbered">
                <li class="list-group-item">Application Name</li>
                <li class="list-group-item">Home url</li>
                <li class="list-group-item">Callback url</li>
                <li class="list-group-item">Application description</li>
            </ol>
            <br/>
            <h2>Endpoints</h2><br />
            <p>
                There are two primary endpoints developers will be using during the OAuth process. Your authorization endpoint is where the users will be directed to begin the authorization flow. After the application obtains an authorization code, it will exchange that code for an access token at the token endpoint. The token endpoint is also responsible for issuing access tokens for other grant types.
                You need to let developers know the URLs for these two endpoints they will be using.
            </p><br/>
            <h2>size of strings</h2><br />
            <p>
                Since developers won’t see an authorization code or access token likely until they’ve started writing code, you should document the maximum sizes of strings they will be encountering.
            </p>
            <br/>
            <h4>List of item in string</h4><br/>
            <ol class="list-group list-group-numbered">
                <li class="list-group-item">Client ID</li>
                <li class="list-group-item">Client Secret</li>
                <li class="list-group-item">Access Token</li>
            </ol>
            <br/>
            <h2>Default Scopes</h2><br />
            <p>
                If the developer does not specify a scope during the authorization request, the service may assume a default scope for that request. If that is the case, you should document what the default scope is.
            </p><br/>
            <h4>How to get Authorization code</h4><br/>
            <p>
                <h6>Create a "Log In" link sending the user to</h6><br/>
                    request=POST
                    url=http://localhost:3000/auth?client_id="+CLIENT_ID+"&response_type=code&state=123abc&redirect_uri=REDIRECT_URI&scope=profile
            </p><br/>
            <h4>Getting an Access Token</h4><br/>
            <p>    
            <h6>Your server exchanges the authorization code for an access token by making a POST request to the authorization server's token endpoint</h6><br/>
            POST http://localhost:8000/accesstoken/accesstoken-code<br/>
            authorizationcode=AUTH_CODE_HERE<br/>
            client_id=CLIENT_ID<br/>
            client_secret=CLIENT_SECRET
            </p><br/>
            <h4>How to get userinfo</h4><br/>
            <p>    
            <h6>Your server making a POST request to the authorization server's getuserinfo endpoint and also pass accesstoken,client id and client secret </h6><br/>
            POST http://localhost:8000/accesstoken/getuserinfo<br/>
            accesstoken=ACCESSTOKEN_CODE_HERE<br/>
            client_id=CLIENT_ID<br/>
            client_secret=CLIENT_SECRET
            </p>

        </div>
    )
}
