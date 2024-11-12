import React from "react";
import './NavbarLoggedIn.css';

const NavbarLoggedIn = () => {
    return (
        <header className="header">
            <a href="/" className="logo">
                <img src="/src/assets/Logo-ocbc.png" alt="Logo" className="logo-image" />
            </a>

            <nav className="navbar">
                {/* Logout Link */}
                <a href="logout" className="logout-link">Logout</a>
                
                {/* Profile Picture */}
                <img src="/src/assets/ProfilePicFSDP.jpg" alt="Profile Pic" className="profile-pic" />
            </nav>
        </header>
    );
};

export default NavbarLoggedIn;
