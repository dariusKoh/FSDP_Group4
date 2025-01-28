import React, { useState } from "react";
import './sign-in.css';
import logo from '../../assets/Logo-ocbc.png';
import Navbar from "../NavBar/Navbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize navigation

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            alert("Login successful!");
            console.log("Token:", data.token); // Store the token securely if used
            navigate("/projects");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <Navbar />
            <form id="loginForm" onSubmit={(e) => e.preventDefault()}>
                <section id="mainSection" className="login-container">
                    <div className="flexBox form-group">
                        <img src={logo} />
                        <h2 id="signInDescription">Sign in to existing user</h2>
                    </div>
                    <div className="flexBox">
                        <label className="inputLabel padItem">Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label className="inputLabel padItem">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div id="forgetPassword" className="padItem finalPress"><a href="::blank">Forgot Password?</a></div>
                        <div className="buttons">
                            <a id="regNew" className="finalPress" href="signup">Register an account</a>
                            <button type="button" onClick={handleLogin} className="finalPress">Sign In</button>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                </section>
            </form>
        </div>
    );
};

export default LoginPage;
