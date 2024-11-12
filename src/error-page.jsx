import { useRouteError } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import { Fragment, useEffect, useRef } from "react";
import Typed from "typed.js";
import './error.css';

export default function ErrorPage() {
    const error = useRouteError();
    console.log("Redirecting to error");
    console.error(error || "No error detected");

    const el = useRef(null);

    // Limit the error message length
    const getErrorMessage = (msg) => {
        if (!msg) return "No idea what caused this.";
        return msg.length > 30 ? `${msg.slice(0, 25)}...` : msg;
    };

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [
                error.status?.toString() || "No idea what",
                `${error.status} ${error.statusText || getErrorMessage(error.message)}`
            ],
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
    }, [error]);

    return (
        <Fragment>
            <Navbar />
            <div id="error-page">
                <h1>Oops!</h1>
                <div className="typeAnim">
                    <span ref={el} />
                </div>
                <p className="mainDesc">
                    Hey, we're so sorry that an unexpected error has occurred. Maybe <i>try something else</i>?
                </p>
                <p>If you're struggling with solving this issue, report this error to our staff.</p>
                <p className="errorMessage">
                    <i>{getErrorMessage(error.data || error.message)}</i>
                </p>
                <button className="returnBtn" onClick={() => window.history.back()}>Back</button>
            </div>
        </Fragment>
    );
}
