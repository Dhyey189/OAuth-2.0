import './Body.css'
import pic from './UTH2.png'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useNavigate,
    useLocation,
  } from "react-router-dom";
export default function Auth() {
    let navigate = useNavigate();
    return(
        <div className='valprop2'>
        <div id="valprop">
		    <header class="valprop-content text-center text-black items-center font-serif ">
			    {/* <h1 className='mb-5 text-sky-400'>AuthPoint</h1>
                 */}
                 <img src={pic}/>
                <h2>Welcome to AuthPoint</h2>
		    </header>
		</div>
        <div className='text-center text-black container w-32 items-center font-serif mt-6 bottom'>
            <h4>AuthPoint is the modern standard for securing access to APIs.</h4>
            <p className='text-lg font-light leading-relaxed mt-6 mb-4 text-pink-800'>AuthPoint use to read data of a user from another application.It supplies the authorization workflow for web application.It is a server side web app that uses authorization code and does not interact with user credentials.</p>
            <h6>See Documentation to know more about AuthPoint and how AuthPoint work </h6>
            <button type="submit" onClick={()=>{navigate("/docs")}}  className=" w-26 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded">
              <span>  Documentation  </span>
            </button>
        </div>
        </div>
    )
}