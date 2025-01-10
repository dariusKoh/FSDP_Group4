# FSDP_Group4

## Table of Contents
* [Project Setup](#project-setup)
* [Technologies Used](#technologies-used)
* [Running the App](#running-the-app)

## Project Setup

### Required Dependencies

#### Docker
Head over to the installation page for Docker (https://docs.docker.com/engine/install/) and install the right engine for your device.

#### Node.js
Make sure Node.js is installed on your computer before running the app. (https://nodejs.org/en/download/)

### Required Node.js Modules
```shell
npm init -y
```

```shell
npm i apexcharts bcrypt cors dockerode dotenv express jest jest-stare lottie-react mongodb mongoose react-apexcharts react-bootstrap  react-dom react-router-dom react realm-web selenium-webdriver typed.js vite
```

#### If an error occurs when installing dependencies, run the script below
```shell
npm i apexcharts bcrypt cors dockerode dotenv express jest jest-stare lottie-react mongodb mongoose react-apexcharts react-bootstrap react-dom react-router-dom react realm-web selenium-webdriver typed.js vite --legacy-peer-deps
```

#### If that also does not work, run the script below
```shell
npm i apexcharts bcrypt cors dockerode dotenv express jest jest-stare lottie-react mongodb mongoose react-apexcharts react-bootstrapreact-dom react-router-dom react realm-web selenium-webdriver typed.js vite --force
```

## Technologies Used
* [React.js](https://react.dev/) - Used for the development of the Front-End
* [Node.js](https://nodejs.org/en) - Used for the development of the Back-End
* [MongoDB](https://www.mongodb.com/) - Used as the Database for the app
* [Docker](https://www.docker.com/) - Used for containerisation to enable scalable testing
* [Jest](https://jestjs.io/) - Used with Selenium to run tests
* [Selenium](https://www.selenium.dev/) - Used with Jest to run test scripts on different browsers

## Running the app

### Create 2 terminal instances

#### Terminal instance 1
```shell
node app.js
```

#### Terminal instance 2
```shell
npm run dev
```

Follow instructions provided in the terminal to launch the app (Usually http://localhost:5173/)

