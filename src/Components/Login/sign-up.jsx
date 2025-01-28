import React, { useState } from "react";
import './sign-up.css';
import logo from '../../assets/Logo-ocbc.png';
import Navbar from "../NavBar/Navbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize navigation

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }
            navigate("/login");
            alert("Registration successful!");
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
