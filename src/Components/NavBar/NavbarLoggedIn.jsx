import React from "react";
import './NavbarLoggedIn.css';

const NavbarLoggedIn = () => {
    return (
        <header className="header">
            <img src="/src/assets/Logo-ocbc.png" alt="Logo" className="logo-image" />

            <nav className="navbar">
                {/* Logout Link */}
                <a href="/" className="logout-link">Logout</a>
                
                {/* Profile Picture with Link to Account Page */}
                <a href="/profile">
                    <img src="/src/assets/ProfilePicFSDP.jpg" alt="Profile Pic" className="profile-pic" />
                </a>
            </nav>
        </header>
    );
};

export default NavbarLoggedIn;
