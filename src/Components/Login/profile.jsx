import React, { Fragment } from 'react'
import logo from "../../assets/Logo-ocbc.png";
import "./profile.css"


function Profile(){
  return (
    <Fragment>
        <form id="updateForm">
            <div className="flexBox">
                <h2 id="signInDescription">You are updating your user profile</h2>
                <section id="iconNameDesc">
                    <img src={logo} id="displayIcon" />
                    <div id="displayName">User</div>
                    <div id="displayDescription">Generic Description here.</div>
                </section>
                <h3 id="userId">Your user id: </h3>
                <div id="logout" className="finalPress">Logout</div>
            </div>
            <div className="flexBox">
                <label id="createUser" className="inputLabel padItem">Username</label>
                <input type="text" name="username" id="username" />
                <label id="changeIcon" className="inputLabel padItem">Icon URL</label>
                <input type="text" name="iconUrl" id="iconUrl" />
                <label id="changeDesc" className="inputLabel padItem">Description</label>
                <input type="text" name="description" id="description" />
                <label className="inputLabel padItem">Backup Email</label>
                <input type="email" name="email" id="email" />
                <label className="inputLabel padItem">Enter Old Password</label>
                <input type="password" name="password" id="oldPassword" />
                <label className="inputLabel padItem">Enter New Password</label>
                <input type="password" name="password" id="newPassword" />
                <label id="confirmLabel" className="inputLabel padItem">Confirm New Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" />
                <div className="buttons">   
                    <button id="changeIcon">Change Icon</button>
                    <button id="signNext" className="finalPress">Update Information</button>
                    <div id="deleteUser" className="finalPress">Delete User</div>
                </div>
            </div>
        </form>
    </Fragment>
  )
}

export default Profile;