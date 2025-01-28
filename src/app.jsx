import React from "react";
import { useRef } from "react";
import './index.css';
import Navbar from "./Components/NavBar/Navbar";
import LoginPage from './Components/Login/sign-in';
import { useNavigate } from "react-router-dom";

const App = () => {
    const additionalInfoRef = useRef(null);
    const navigate = useNavigate();

    const scrollToAdditionalInfo = () => {
        additionalInfoRef.current.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <div>
            <Navbar />
            <div className="content">
                {/* Image Section */}
                <section className="image-section">
                    {/* https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hippopng.com%2Fpng-bwlw07%2F&psig=AOvVaw399daukZ-ewn2uxo1o1S2l&ust=1730960863640000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOjzte6Jx4kDFQAAAAAdAAAAABAe */}
                    <img src="/src/assets/MainPage_Img.png" alt="Automation Testing Tools" />
                </section>
                {/* Text Section */}
                <section className="text-section">
                    <h1>Automation Testing Tool </h1>
                    <p>
                        Discover the top Automation Testing Tools in the market & learn how these tools 
                        can help you deliver high-quality software.
                    </p>
                    <div className="buttons">
                        <button className="get-started"onClick={() => navigate('/login')}>Get Started</button>
                        <button className="find-out-more" onClick={scrollToAdditionalInfo}>Find Out More</button>
                    </div>
                </section>
            </div>
            {/* New Section */}
            <div ref={additionalInfoRef} className="additional-info">
                <h1>What are Automation Testing Tools?</h1>
                <p>
                    Automation testing tools are software applications designed to automatically test other software, ensuring it functions correctly. These tools improve testing efficiency, accuracy, and coverage by running tests faster than humans, eliminating errors, and covering many scenarios.
                </p>
                <p>
                    They support continuous integration by automating repetitive tasks, enabling quicker feedback for developers and testing teams. They also help maintain consistency across different testing environments. By automating tests, development and testing teams can focus more on building features and less on manual testing.
                </p>

                <h1>How to choose the right Automation Testing Tools?</h1>
                <p>
                    Choosing the right automation testing tools involves evaluating various factors to ensure the selected tool meets your project’s specific needs. Here are key considerations to help you make the right choice.
                </p>
                <ol>
                    <li><strong>Project Requirements:</strong> Understand the scope of your project. Determine the type of application (web, mobile, desktop) and the testing needs (functional, performance, security).</li>
                    <li><strong>Ease of Use:</strong> The tool should have an intuitive interface and be easy to learn and use. This reduces the learning curve for your team.</li>
                    <li><strong>Supported Platforms and Languages:</strong> Ensure the tool supports the platforms (Windows, macOS, Linux) and programming languages (Java, Python, JavaScript) used in your project.</li>
                    <li><strong>Integration Capabilities:</strong> The tool should integrate well with your existing CI/CD pipeline, version control systems, and other development tools.</li>
                    <li><strong>Scalability:</strong> Choose a tool that can handle your current needs and scale as your project grows.</li>
                    <li><strong>Cost:</strong> Consider the budget for your project. There are both open-source and commercial tools available, each with its own cost-benefit ratio.</li>
                    {/* Add more list items as needed */}
                </ol>
            </div>
            <div className="cta-section">
                <h1>Need Automation Testing Tools for your website?</h1>
                <p>
                    Try to run Website Automation Tests on Real devices & browsers on our Wrb Application now.
                    Test under real-world conditions for accurate test results & end-user-like experience.
                </p>
                <button className="get-started-btn"onClick={() => navigate('/login')}>Get Started</button>
            </div>

        </div>
    );
}
export default App;
