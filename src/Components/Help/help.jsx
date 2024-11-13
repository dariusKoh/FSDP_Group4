import React from 'react';
import { useState } from 'react';
import { useLottie } from 'lottie-react';
import Loading from "../../assets/Loading.json";
import downloadDocker from '../../assets/download-docker.mp4';
import './help.css';

const Help = () => {
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

  const npmIns = "npm i apexcharts bcrypt chart.js dockerode dotenv express jest jest-stare lottie-react mongodb mongoose react-apexcharts react-bootstrap react-chartjs react-dom react-router-dom react realm-web selenium-webdriver typed.js vite";

  const installAll = "npm i apexcharts chart.js dotenv lottie-react mongodb react-apexcharts react-bootstrap react-chartjs react-dom react-router-dom react realm-web typed.js vite"
  return (
    <div className="overview-container">
        <h1 className='mainHead'>Documentation</h1>
        <div className='divider'>
            {Circle1}
            {Circle2}
            {Circle3}
            <p className="doc-subHead">How this works</p>
            {Circle6}
            {Circle5}
            {Circle4}
        </div>
        
        <section className='text-section'>
            <h1> Project Setup </h1>
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
            <p>This installs all the required dependencies for this project automatically. For the list of used modules, refer below:</p>


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
            <h2> Installing Docker </h2>
            <div className='divider'></div>
            <p>To work with this project. Docker should be installed. To install Docker, follow these steps:</p>
            <h3>Step 1: Open up Docker Website</h3>
            <p>Open up the Docker Website, 
                or use the link 
                <a href="https://www.docker.com">docker.com</a>. 
                When you hover over the Download Docker button,
                under the Download button,
                you can 
                download the suitable docker type 
                based on the computer you are 
                running this on. 
                For Windows, this is 
                "Download for Windows - AMD64", 
                for Mac it depends if you are 
                using the default Apple Silicon CPU 
                or an Intel chip. To download, simply click it.
                If your device initially blocks the download,
                press "Download unverified file" to download anyways.
                </p>
                <video className="docVid" loop autoPlay src={downloadDocker}></video>
        </section>
    </div>
  )
}

export default Help;