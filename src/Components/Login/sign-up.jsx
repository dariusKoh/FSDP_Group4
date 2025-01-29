import React, { useState } from "react";
import './sign-up.css';
import logo from '../../assets/Logo-ocbc.png';
import Navbar from "../NavBar/Navbar";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("user"); // Default role is "user"
    const [error, setError] = useState("");

    const handleRegister = async () => {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
      
        try {
          const response = await fetch('http://localhost:3001/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, role }),
          });
          const data = await response.json();
      
          if (!response.ok) {
            throw new Error(data.message || "Registration failed");
          }
      
          // Redirect to the login page
          alert("Registration successful! Please log in to continue.");
          window.location.href = "/login";
        } catch (err) {
          setError(err.message);
        }
      };
      
    return (
        <div>
            <Navbar />
            <form id="regForm" onSubmit={(e) => e.preventDefault()}>
                <div className="flexBox">
                    <h2 id="registerDescription">Registering User</h2>
                    <section id="iconNameDesc">
                        <img src={logo} id="displayIcon" />
                        <div id="displayName">Sign up with Us!</div>
                    </section>
                </div>
                <div className="flexBox">
                    <label id="createUser" className="inputLabel padItem">Enter new Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label className="inputLabel padItem">Enter backup email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label className="inputLabel padItem">Create a Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label id="confirmLabel" className="inputLabel padItem">Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <label className="inputLabel padItem">Select Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <div className="buttons">
                        <button type="button" onClick={handleRegister} className="finalPress">Create Account</button>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </form>
        </div>
    );
};

export default SignUp;