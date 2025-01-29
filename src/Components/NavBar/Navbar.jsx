import React, { useState, useEffect } from "react";
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setUsername(localStorage.getItem("username"));
    }
  }, []);

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
        <a href="projects">Product</a>
        <a href="tests">Status</a>
        <a href="/">Credits</a>

        {isLoggedIn ? (
          <>
            <span>Welcome, {username}!</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <a href="login" className="login-link">Login</a>
        )}
      </nav>
    </header>
  );
};

export default Navbar;