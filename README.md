# FSDP_Group4

## Project Setup

### Required Node Modules
```shell
npm init -y
```

```shell
npm i dockerode selenium-webdriver jest
```

```shell
npm i jest-stare
```

```shell
npm i mongodb
```

## Running the tests on Docker (Chrome)

### Pull a Docker Image
```shell
docker pull selenium/standalone-chrome
```

### Create Container
```shell
docker run -d -p 4444:4444 -p 7900:7900 --shm-size="2g" selenium/standalone-chrome
```

### Running the tests
```shell
npm run test
```
