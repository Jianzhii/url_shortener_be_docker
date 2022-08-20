# URL Shortener Service Backend

## DB Setup

Statements to create the schema and table for the application itself and testing have been provided within the `url_db.sql` file. Copy, paste and execute the statements within the file to set up the database for this application.

## Installation of packages

```bash
$ npm install
```

## Running the app locally

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# watch mode
$ npm run test:watch
```

## .env File

A `.env` file is necessary to start up the application. This file will contain the database credentials for the application to connect to as well as other environment variables such as the port number the application will be running on and the domain name the system is using and to be returned to user.

Create a `.env` file at the root of the application with the follow attributes before starting the application. Replace the placeholders with the respective value.

```
ENV = xxx
PORT = 3000
DOMAIN_NAME = http://localhost:8080/

DATABASE_HOST = xxx
DATABASE_USER = xxx
DATABASE_PASSWORD = xxx
DATABASE_PORT = xxx
DATABASE = xxx

DATABASE_HOST_TEST = xxx
DATABASE_USER_TEST = xxx
DATABASE_PASSWORD_TEST = xxx
DATABASE_PORT_TEST = xxx
DATABASE_TEST = xxx
```

## Docker Image

A `Dockerfile` is included to build the application into a container image. A similar image has also been published to Docker Registry and can be pulled using the following command:

```bash
# building image locally
$ docker build -t <image_name> .

# pulling from Docker Registry
$ docker pull jzshum/url_shortener_be
```

## Running the app in a container

Once the image has been pulled or created, it can be started within a docker container with the following command:

```bash
$ docker run -d -p 3000:3000 --env-file .env <image_name>
```

where the `.env` is the same `.env` used to start the application locally and contain the same variables mentioned in the earlier [section](#env-file) on `.env` and the application listening to port 3000.
