import React from "react";
import './Navbar.css'

const Navbar = () => {
    return(
        <header className="header" >
            <a href="/" className="logo">
                <img src="/src/assets/Logo-ocbc.png" alt="Logo" className="logo-image" />
            </a>

            <nav className="navbar">
                <a href="/">Home</a>
                <a href="/">Product</a>
                <a href="/">Status</a>
                <a href="/">Credits</a>
            </nav>
            
        </header>
    )
}
export default Navbar