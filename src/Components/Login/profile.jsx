import React, { Fragment, useState } from 'react';
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import logo from "../../assets/Logo-ocbc.png";
import "./profile.css";

function Profile() {
    const navigate = useNavigate(); // Initialize navigate function
    const [showLogoutModal, setShowLogoutModal] = useState(false); // State to manage the modal visibility

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remove the auth token from localStorage
        setShowLogoutModal(true); // Show the logout modal
        setTimeout(() => {
            navigate("/"); // Redirect to the login page after a short delay
        }, 2000); // Delay to allow the modal to show
    };

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
                    {/* Add logout functionality */}
                    <div id="logout" className="finalPress" onClick={handleLogout}>
                        Logout
                    </div>
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

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="logout-modal">
                    <div className="modal-content">
                        <p>You have successfully logged out!</p>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default Profile;
