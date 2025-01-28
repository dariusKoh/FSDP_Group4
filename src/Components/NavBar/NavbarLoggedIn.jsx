import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './NavbarLoggedIn.css';

const NavbarLoggedIn = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const [showLogoutModal, setShowLogoutModal] = useState(false); // State to manage the modal visibility

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Clear the authentication token from localStorage
        setShowLogoutModal(true); // Show the logout modal
        setTimeout(() => {
            navigate("/"); // Redirect to the login or home page after a short delay
        }, 2000000); // Delay to allow the modal to show
    };

    return (
        <header className="header">
            <img src="/src/assets/Logo-ocbc.png" alt="Logo" className="logo-image" />

            <nav className="navbar">
                {/* Logout Link */}
                <a href="/" className="logout-link" onClick={handleLogout}>
                    Logout
                </a>

                {/* Profile Picture with Link to Account Page */}
                <a href="/profile">
                    <img src="/src/assets/ProfilePicFSDP.jpg" alt="Profile Pic" className="profile-pic" />
                </a>
            </nav>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="logout-modal">
                    <div className="modal-content">
                        <p>You have successfully logged out!</p>
                    </div>
                </div>
            )}
        </header>
    );
};

export default NavbarLoggedIn;
