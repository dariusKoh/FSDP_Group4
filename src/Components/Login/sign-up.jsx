import React, { Fragment } from "react";
import './sign-up.css';
import logo from '../../assets/Logo-ocbc.png';
import Navbar from "../NavBar/Navbar";


function SignUp(){
  return (
    <Fragment>
            <Navbar />
            <form id="regForm">
                <div className="flexBox">
                    <h2 id="registerDescription">Registering User</h2>
                    <section id="iconNameDesc">
                        <img src={logo} id="displayIcon" />
                        <div id="displayName">Sign up with Us!</div>
                    </section>
                </div>
                <div className="flexBox">
                    <label id="createUser" className="inputLabel padItem">Enter new Username</label>
                    <input type="text" name="username" id="username" />
                    <label className="inputLabel padItem">Enter backup email</label>
                    <input type="email" name="email" id="email" />
                    <label className="inputLabel padItem">Create a Password</label>
                    <input type="password" name="password" id="password" />
                    <label id="confirmLabel" className="inputLabel padItem">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" />
                    <div className="buttons">
                        <div id="returnbtn" class="finalPress" onClick={function(){history.back()}}>Back</div>
                        <button id="signNext" className="finalPress" value="submit">Create Account</button>
                    </div>
                </div>
            </form>
    </Fragment>
  )
}

export default SignUp;