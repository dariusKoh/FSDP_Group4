import React, { Fragment } from "react";
import './sign-in.css';
import logo from '../../assets/Logo-ocbc.png';
import Navbar from "../NavBar/Navbar";

const LoginPage = () => {
    return (
        <Fragment>
            <Navbar />
            <form method="post" id="loginForm" action="http://localhost:3000/login">
                <section id="mainSection" class="login-container">
                    <div class="flexBox form-group">
                        <img src={logo} />
                        <h2 id="signInDescription">Sign in to existing user</h2>
                    </div>
                    <div class="flexBox">
                        <label class="inputLabel padItem">Username</label>
                        <input type="text" name="username" id="username"></input>
                        <label class="inputLabel padItem">Password</label>
                        <input type="password" name="password" value="" id="password"></input>
                        <div id="forgetPassword" class="padItem finalPress"><a href="::blank">Forgot Password?</a></div>
                        <div class="buttons">
                            <div id="regNew" class="finalPress" onclick="regUser()"><a href="./html/regUser.html">Register an account</a></div>
                            <button id="signNext" class="finalPress" value="submit" type="submit">Sign In</button>
                        </div>
                    </div>
                </section>
            </form>
        </Fragment>
    )
}

export default LoginPage;