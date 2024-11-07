import React from "react";
import './NavbarLoggedIn.css'

const NavbarLoggedIn = () => {
    return(
        <header className="header" >
            <a href="/" className="logo">
                <img src="/src/assets/Logo-ocbc.png" alt="Logo" className="logo-image" />
            </a>

            <nav className="navbar">
                <a href="/">My Projects</a>
                <a href="projects">Servers</a>
                <a href="tests">Help</a>
                <a href="/">Credits</a>
                <a href="logout" className="logout-link">Logout</a>
            </nav>
            
        </header>
    )
}
export default NavbarLoggedIn