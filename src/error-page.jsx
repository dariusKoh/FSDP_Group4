import { useRouteError } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import { Fragment } from "react";
import './error.css';
import Typed from "typed.js";
import { useEffect, useRef } from "react";

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error == null)
    console.log("Redirecting to error");
    console.error(error || "No error detected");

    const el = useRef(null);
    useEffect(
        ()=>{
            const typed = new Typed(el.current,{
                strings: [error.status.toString() || "No idea what" , (error.status.toString() + " " + (error.statusText || error.message)) || "Try checking logs"],
                startDelay: 300,
                typeSpeed: 100,
                backSpeed: 150,
                backDelay: 200,
                loop: true,
                smartBackspace: true,
            });
            
            return () => {
                typed.destroy();
        };

        },
        []
    );

    return (
        <Fragment>
            <Navbar />
            <div id="error-page">
            <h1>Oops!</h1>
            <div className="typeAnim">
                <span ref={el}/>
            </div>
            
            <p className="mainDesc">Hey, we're so sorry that an unexpected error has occurred. Maybe <i>try something else</i>?</p>
            <p>If you're struggling with solving this issue, report this error to our staff.</p>
            <p className="errorMessage">
                <i>{error.data || error.message || "No idea what caused this."}</i>
            </p>    
            <button className="returnBtn" onClick={function(){history.back()}}>Back</button>
            </div>
        </Fragment>
    );
}