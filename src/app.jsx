import React from "react";
import './index.css';
import Navbar from "./Components/NavBar/Navbar";

const App = () => {
    return (
        <div>
            <Navbar />
            <div className="content">
                {/* Left Section */}
                <section className="left-section">
                    <h1>Web-Application Title</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </section>

                {/* Right Section */}
                <section className="right-section">
                    <p>Give your users a seamless experience by testing on 5,000+ real devices.</p>
                    <p>Don't compromise with emulators and simulators.</p>
                    <button>Get Started</button>
                </section>
            </div>
        </div>
    );
}
export default App