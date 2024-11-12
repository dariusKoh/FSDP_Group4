import React, { Fragment } from "react";
import './sign-in.css';
import logo from '../../assets/Logo-ocbc.png';
import Navbar from "../NavBar/Navbar";

const LoginPage = () => {
    return (
        <Fragment>
            <Navbar />
            <form id="loginForm">
                <section id="mainSection" className="login-container">
                    <div className="flexBox form-group">
                        <img src={logo} />
                        <h2 id="signInDescription">Sign in to existing user</h2>
                    </div>
                    <div className="flexBox">
                        <label className="inputLabel padItem">Username</label>
                        <input type="text" name="username" id="username"></input>
                        <label className="inputLabel padItem">Password</label>
                        <input type="password" name="password" id="password"></input>
                        <div id="forgetPassword" className="padItem finalPress"><a href="::blank">Forgot Password?</a></div>
                        <div className="buttons">
                            <a id="regNew" className="finalPress" href="signup">Register an account</a>
                            <a id="signNext" className="finalPress">Sign In</a>
                        </div>
                    </div>
                </section>
            </form>
        </Fragment>
    )
}

export default LoginPage;