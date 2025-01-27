# FSDP_Group4

## Table of Contents

- [Project Setup](#project-setup)
- [Technologies Used](#technologies-used)
- [Running the App](#running-the-app)

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
npm i @google/generative-ai apexcharts bcrypt cors dockerode dotenv express jest jest-stare jsonwebtoken lottie-react mongodb mongoose react-apexcharts react-bootstrap react-dom react-router-dom react realm-web selenium-webdriver typed.js vite
```

#### If an error occurs when installing dependencies, run the script below

```shell
npm i @google/generative-ai apexcharts bcrypt cors dockerode dotenv express jest jest-stare jsonwebtoken lottie-react mongodb mongoose react-apexcharts react-bootstrap react-dom react-router-dom react realm-web selenium-webdriver typed.js vite --legacy-peer-deps
```

#### If that also does not work, run the script below

```shell
npm i @google/generative-ai apexcharts bcrypt cors dockerode dotenv express jest jest-stare jsonwebtoken lottie-react mongodb mongoose react-apexcharts react-bootstrapreact-dom react-router-dom react realm-web selenium-webdriver typed.js vite --force
```

## Technologies Used

- [React.js](https://react.dev/) - Used for the development of the Front-End
- [Node.js](https://nodejs.org/en) - Used for the development of the Back-End
- [MongoDB](https://www.mongodb.com/) - Used as the Database for the app
- [Docker](https://www.docker.com/) - Used for containerisation to enable scalable testing
- [Jest](https://jestjs.io/) - Used with Selenium to run tests
- [Selenium](https://www.selenium.dev/) - Used with Jest to run test scripts on different browsers

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

### Testing CI

1. Clone demo repo (You can use your own repo)
   Demo Repo link: [https://github.com/dariusKoh/FSDP_CICD_Demo](https://github.com/dariusKoh/FSDP_CICD_Demo)
1. Open directory of the cloned repository (C:\FSDP_CICD_Demo)
1. Open the .git folder
1. Open the hooks folder. Your directory should look like: (C:\FSDP_CICD_Demo\\.git\hooks)
1. Rename the file called "pre-push.sample" to "pre-push"
1. Open the file and change the contents to the code in [pre-push](./pre-push)
1. Ensure that pre-push has executable access

```bash
chmod -x C:\FSDP_CICD_Demo\.git\hookspre-push
```

8. Push a commit from the git repository when app.js is running.
