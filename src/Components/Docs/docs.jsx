import React from 'react';
import { useState } from 'react';
import { useLottie } from 'lottie-react';
import Loading from "../../assets/Loading.json";
import downloadDocker from '../../assets/download-docker.mp4';
import './docs.css';

const Docs = () => {
    // Lottie animation options
  const options = {
    animationData: Loading,
    loop: true,
  };

  const animStyle = {
    width: '50px',
    position: 'relative',
    transform: 'translate(50%,-50%)'
  };

  const animStyle2 = {
    width: '100px',
    position: 'relative',
    transform: 'translateY(-75%)'
  }
  const animStyle3 = {
    width: '75px',
    position: 'relative',
    transform: 'translate(-50%,-30%)'
  }
  const animStyle4 = {
    width: '75px',
    position: 'relative',
    transform: 'translate(-50%,-30%)'
  }
  const animStyle6 = {
    width: '50px',
    position: 'relative',
    transform: 'translate(50%,-50%)'
  };
  
  // Why cant I reuse this smh
  const { View:Circle1 } = useLottie(options, animStyle);
  const { View:Circle2 } = useLottie(options, animStyle2);
  const { View:Circle3 } = useLottie(options, animStyle3);
  // Why cant I reuse this smh
  const { View:Circle4 } = useLottie(options, animStyle4);
  const { View:Circle5 } = useLottie(options, animStyle2);
  const { View:Circle6 } = useLottie(options, animStyle6);

  const npmIns = "npm i apexcharts bcrypt dockerode dotenv express jest jest-stare lottie-react mongodb mongoose react-apexcharts react-bootstrap  react-dom react-router-dom react realm-web selenium-webdriver typed.js vite";
  const runFront = "npm run dev";
  
  return (
    <div className="overview-container">
        <h1 className='mainHead'>Documentation</h1>
        <div className='divider'>
            {Circle1}
            {Circle2}
            {Circle3}
            <p className="doc-subHead">Product Overview</p>
            {Circle6}
            {Circle5}
            {Circle4}
        </div>
        <section className="table-contents">
          <ul>
            <li><a>Project Setup</a></li>
          </ul>
        </section>
        <div className='divider'></div>
        <section className='text-section'>
          <h1> Project Setup </h1>
          <h2>Required Dependencies</h2>
          <h2>Docker</h2>
          <p>Head over to the installation page for Docker (<a href="https://docs.docker.com/engine/install/">https://docs.docker.com/engine/install/</a>) and install the right engine for your device.</p>
          <div className='divider'></div>
          <h2>Node.js</h2>
          <p>Make sure Node.js is installed on your computer before running the app. (<a href="https://nodejs.org/en/download/">https://nodejs.org/en/download/</a>)</p>
        </section>
        <section className='text-section'>
            <h2> Installing Node Modules </h2>
            <p>Open up a terminal where this project is running, and run the following code into the terminal.</p>
            <code>
                <p className="modules">{npmIns}</p>
            <button className="copy" onClick={async () =>{
                await window.navigator.clipboard.writeText(npmIns);
                console.log("Copied!");
                window.alert("Copied!");
            }}>Copy</button>
            </code>
            <div className='divider'></div>
            <p>If an error occurs when installing dependencies, run the script below: </p>
            <code>
                <p className="modules">{npmIns+"--legacy-peer-deps"}</p>
            <button className="copy" onClick={async () =>{
                await window.navigator.clipboard.writeText(npmIns+"--legacy-peer-deps");
                console.log("Copied!");
                window.alert("Copied!");
            }}>Copy</button>
            </code>
            <div className='divider'></div>
            <p>If that also does not work, run the script below: </p>
            <code>
                <p className="modules">{npmIns+"--force"}</p>
            <button className="copy" onClick={async () =>{
                await window.navigator.clipboard.writeText(npmIns+"--force");
                console.log("Copied!");
                window.alert("Copied!");
            }}>Copy</button>
            </code>
            <div className='divider'></div>
            <p>This installs all the required dependencies for this project automatically. For the list of used modules, refer below.</p>
            <h1>Technologies Used</h1>
            
            <h4>React.js</h4>(<a href="https://react.dev/">https://react.dev/</a>) - Used for the development of the Front-End
            <h4>Node.js</h4>(<a href="https://nodejs.org/en">https://nodejs.org/en</a>) - Used for the development of the Back-End
            <h4>MongoDB</h4>(<a href="https://www.mongodb.com/">https://www.mongodb.com/</a>) - Used as the Database for the app
            <h4>Docker</h4>(<a href="https://www.docker.com/">https://www.docker.com/</a>) - Used for containerisation to enable scalable testing
            <h4>Jest</h4>(<a href="https://jestjs.io/">https://jestjs.io/</a>) - Used with Selenium to run tests
            <h4>Selenium</h4>(<a href="https://www.selenium.dev/">https://www.selenium.dev/</a>) - Used with Jest to run test scripts on different browsers
            
          </section>
          <div className='divider'></div>
          <section classsName="text-section">
            <h2>Libraries used</h2>
            <ul className='module-list'>
                <p className='listHead'>Front-End</p>
                <li className='module'>React</li>
                <p className="moduleDesc">React language to create front-end using TypeScript.</p>
                <li className='module'>React-Bootstrap</li>
                <p className="moduleDesc">Module that integrates the Bootstrap library for React.</p>
                <li className='module'>React-Router-Dom</li>
                <p className="moduleDesc">Routing through the DOM with React together with React-Dom.</p>
                <li className='module'>React-Dom</li>
                <p className="moduleDesc">Enables a DOM structure for routing pages with React-Router-Dom.</p>
                <li className='module'>React-Apexcharts</li>
                <p className="moduleDesc">React library that integrates the Apexchart library for React.</p>
                <li className='module'>React-Chart.js</li>
                <p className="moduleDesc">React library that builds Chart.js for charts and graphs.</p>
                <li className='module'>Lottie-React</li>
                <p className="moduleDesc">Used for adding lottie based animations.</p>
                <li className='module'>Apexcharts</li>
                <p className="moduleDesc">Apexcharts library for charting models and graphs.</p>
                <li className='module'>Typed</li>
                <p className="moduleDesc">Used for the Typed.js library of animations for words.</p>
                <li className='module'>Vite</li>
                <p className="moduleDesc">Vite plugin that allows front-end to be built and run on a local website.</p>

                <p className='listHead'>Back-End</p>
                <li className='module'>Dockerode</li>
                <p className="moduleDesc">Dockerode to implement Docker based solutions for back-end.</p>
                <li className='module'>Bcrypt</li>
                <p className="moduleDesc">Encyption library for backend to encrypt data for security.</p>
                <li className='module'>Dotenv</li>
                <p className="moduleDesc">Dotenv for running database environments in code.</p>
                <li className='module'>Jest</li>
                <p className="moduleDesc">JavaScript Testing Framework with a focus on simplicity.</p>
                <li className='module'>Jest-Stare</li>
                <p className="moduleDesc">Jest HTML reporter that
                    takes summary test results from jest and 
                    parses them into an HTML file for 
                    improved readability and filtering.</p>
                    <li className='module'>MongoDB</li>
                <p className="moduleDesc">MongoDB to access the MongoDB database used for storing our users, test datas, and test files.</p>
                <li className='module'>Mongoose</li>
                <p className="moduleDesc">Accessing Atlas App Services from a web-browser, for use with MongoDB.</p>
                <li className='module'>Selenium WebDriver</li>
                <p className="moduleDesc">Selenium WebDriver is used to drive a browser natively, as a user would, either locally or on a remote machine using the Selenium server.</p>
            </ul>
            <div className='divider'></div>
            <section className='text-section'>
              <h2>Running Front-End</h2>
              <p>Return to the command terminal of the project, and run the following:
              <code>
                  <p className="modules">{runFront}</p>
              <button className="copy" onClick={async () =>{
                  await window.navigator.clipboard.writeText(npmIns);
                  console.log("Copied!");
                  window.alert("Copied!");
              }}>Copy</button>
              </code>
              </p>
            </section>

            <div className='divider'></div>
            <h2> Running Test </h2>
            <div className='divider'></div>
            <p>To run the tests, follow these steps:</p>
            <h3>Make sure Node.js is installed</h3>
            <p>Run <a>node -v</a> in the terminal.</p>
            <h3>Make sure Docker is installed</h3>
            <p>Run <a>docker -v</a>.</p>
            <h3>Run app.js</h3>
            <p>node app.js</p>
        </section>
        <div className='divider'></div>
    </div>
  )
}

export default Docs;