# URL Shortener Service Backend

## DB Setup

Statements to create the schema and table for the application itself and testing have been provided within the `url_db.sql` file. Copy, paste and execute the statements within the file to set up the database for this application.

## Installation of packages

```bash
$ npm install
```

## Running the app

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
