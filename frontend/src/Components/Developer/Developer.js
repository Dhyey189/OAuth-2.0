import React,{ useState, useEffect, useRef } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useNavigate,
    useLocation,
  } from "react-router-dom";
import ClientID from '../ClientID/ClientID.js';
import Modal from 'react-bootstrap/Modal'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'

export default function Developer() {
    let navigate = useNavigate();
    const [apps,setApps] = useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [user, setUser] = useState(null);
    useEffect(() => {
        if(localStorage.getItem("user") === null){
            navigate('/login?backto=developer');
            return;
        }
        else{
            setUser(JSON.parse(localStorage.getItem("user")));
        }
        fetch("http://localhost:8000/application/get-application-details", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id:JSON.parse(localStorage.getItem("user"))._id}),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.success) {
            console.log("data:",data.data);;
            setApps(data.data);
        }
        else {
            console.log("Something went wrong!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    },[showModal])
    const AppDetails = (url,users,CID,CS) =>{
        return(
        <table className="w-full text-purple-900 bg-purple-100">
                <tr className="mb-2">
                    <td>
                        <p className="mb-0">Home Page Url</p>
                    </td>
                    <td>
                        <a href={url} target="_blank">{url} </a>
                    </td>
                </tr>
                <tr className="mb-2">
                    <td>
                        <p className="mb-0">Number of Users</p>
                    </td>
                    <td>
                        <p className="mb-0">{users}</p>
                    </td>
                </tr>
                <tr className="mb-2">
                    <td>
                        <p className="mb-0">ClientID</p>
                    </td>
                    <td>
                        <p className="mb-0">{CID}</p>
                    </td>
                </tr>
                <tr className="mb-2">
                    <td>
                        <p className="mb-0">Client Secret</p>
                    </td>
                    <td>
                        <p className="mb-0">{CS}</p>
                    </td>
                </tr>
            </table>)
    } 
    return (
        <>
        <div className="m-8">
            
            <div className="flex flex-col justify-center w-2/5 mx-auto">
            <h3 className="mb-6 ">Your Apps</h3>
            {apps.map( (app,i) => 
            <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="my-1 flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>{i+1}. {app.applicationname}</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-1 pb-2 text-sm text-gray-500">
                {AppDetails(app.homepageurl,app.users.length,app._id,app.clientsecret)}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
            ) }
          <button type="submit" onClick={()=>setShowModal(!showModal)}  className=" w-fit mx-auto mt-6 w-26 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded">
                <span>  Create New Application  </span>
          </button>
            </div>
         <Modal show={showModal} onHide={()=>setShowModal(false)}
      centered>
            <ClientID/>
        </Modal>
            </div>
        </>
    )
}
