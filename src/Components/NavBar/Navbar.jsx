import React, { useState, useEffect } from "react";
import './Navbar.css';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
  };

  return (
    <header className="header">
      <a href="/" className="logo">
        <img src="/src/assets/Logo-ocbc.png" alt="Logo" className="logo-image" />
      </a>

      <nav className="navbar">
        <a href="/">Home</a>
        <a href="login">Product</a>
        <a href="tests">Status</a>
        <a href="/">Credits</a>
        <a href="login" className="login-link">Login</a>
      </nav>
    </header>
  );
};

export default Navbar;