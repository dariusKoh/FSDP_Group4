import React from 'react';
import { useLottie } from 'lottie-react';
import Loading from "../../assets/Loading.json";
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


  const textSegment = `
------------------------------------------------
npm i dockerode selenium-webdriver jest
------------------------------------------------

------------------------------------------------
npm i jest-stare
------------------------------------------------

------------------------------------------------
npm i mongodb
------------------------------------------------

------------------------------------------------
npm i bcrypt
------------------------------------------------

------------------------------------------------
npm install mongoose
------------------------------------------------
## Running the tests on Docker (Chrome)

### Pull a Docker Image
------------------------------------------------
docker pull selenium/standalone-chrome
------------------------------------------------

### Create Container
------------------------------------------------
docker run -d -p 4444:4444 -p 7900:7900 --shm-size="2g" selenium/standalone-chrome
------------------------------------------------

### Running the tests
------------------------------------------------
npm run test
------------------------------------------------
  `;


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
            <h2> Required Node Modules </h2>
            <ul className='module-list'>
                <li className="module">
                    Apexcharts: |Version 3.54.1 or higher|
                </li>
                <li className="module">
                    Chart.js: |Version 4.4.6 or higher|
                </li>
                <li className="module">
                    Dotenv: |Version 16.4.5 or higher|
                </li>
                <li className="module">
                    Lottie-react: |Version 2.4.0 or higher|
                </li>
                <li className="module">
                    Mongodb: |Version 6.10.0 or higher|
                </li>
                <li className="module">
                    Mongoose: |Version 8.8.1 or higher|
                </li>
                <li className="module">
                    React-apexcharts: |Version 1.5.0 or higher|
                </li>
                <li className="module">
                    React-bootstrap: |Version 2.10. or higher|
                </li>
                <li className="module">
                    React-chartjs-2: |Version 5.2.0 or higher|
                </li>
                <li className="module">
                    React-router-dom: |Version 6.27.0 or higher|
                </li>
                <li className="module">
                    Realm-web: |Version 2.0.1 or higher|
                </li>
                <li className="module">
                    Typed.js: |Version 2.1.0 or higher|
                </li>
                <li className='module'>
                    Bcrypt: |Version 5.1.1 or higher|
                </li>
                <li className="module">
                    Dockerode: |Version 4.0.2 or higher|
                </li>
                <li className="module">
                    Jest: |Version 29.7.0 or higher|
                </li>
                <li className="module">
                    Jest-stare: |Version 2.5.2 or higher|
                </li>
                <li className="module">
                    Selenium-webdriver: |Version 4.26.0 or higher|
                </li>
            </ul>
            <div className='divider'></div>
            <h2>Installing dependencies</h2>
            <pre className="code">
                <code>
                    {installAll}
                </code>
                {textSegment}   
            </pre>

        </section>
    </div>
  )
}

export default Docs;