import React, { Fragment } from "react";
import './sign-in.css';
import logo from '../../assets/Logo-ocbc.png';
import Navbar from "../NavBar/Navbar";

const SignUpPage = () => {
    return (
        <Fragment>
            <Navbar />
            <div id="returnbtn" class="finalPress">Back</div>
            <form id="regForm">
                <div class="flexBox">
                    <h2 id="registerDescription">Registering User</h2>
                    <section id="iconNameDesc">
                        <img src={logo} id="displayIcon"/>
                        <div id="displayName">Sign up with Us!</div>
                    </section>
                </div>
                <div class="flexBox">
                    <label id="createUser" class="inputLabel padItem">Enter new Username</label>
                    <input type="text" name="username" id="username" />
                    <label class="inputLabel padItem">Enter backup email</label>
                    <input type="email" name="email" id="email" />
                    <label class="inputLabel padItem">Create a Password</label>
                    <input type="password" name="password" id="password" />
                    <label id="confirmLabel" class="inputLabel padItem">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" />
                    <div class="buttons">
                        <button id="signNext" class="finalPress" value="submit">Create Account</button>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

export default SignUpPage;