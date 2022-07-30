Dear reviewer,

i have send the ENV variables inside the student notes in the submit section as in the rubric recommended. In case you didn't see them, here are the variables below:

ENV=dev
PG_HOST=localhost
PG_DB=db_shopping
PG_DB_TEST=db_shopping_test
PG_USER=shopping_client
PG_PW=password123
PG_DR=pg
BCRYPT_PW=123abrakadabra!
SALT_ROUNDS=10
TOKEN_SECRET=987simsalabim!

best regards

# Storefront Backend Project

## Description

This is the Udacity 'Storefront Backend'-Project from the 'Creating an API with PostgreSQL and Express'-Course and 'Full Stack JavaScript Developer Program'-Nanodegree.
This App provides a RESTful-API for a Shop-Front-End to interact with a database. The API handles products, users and orders. The Endpoints and the data-shapes are defined in the REQUIREMENTS.md.

## Required Technologies

This application make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Preparation & Installation

### 1. Database

- PostgreSQL Database Server is required. If not already done, install PostgreSQL on your local Machine.
  - Link to PostgreSQL Download -> [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
- do the following steps in SQL Shell to configure the user and databases: - `CREATE USER shopping_client WITH PASSWORD ...;` (take password from provided .env) - `CREATE DATABASE db_shopping;` and `CREATE DATABASE db_shopping_test;` - `GRANT ALL PRIVILEGES ON DATABASE db_shopping TO shopping_client;`
  and `GRANT ALL PRIVILEGES ON DATABASE db_shopping_test TO shopping_client;`

### 2. Application

Use a Linux Shell Terminal like git bash, navigate to the root directory and run

- `npm install` to install all dependencies
- `npm i -g db-migrate` to install db-migrate globally
- `db-migrate up` to create the database tables

## Scripts

- formatting: `npm run prettier`
- linting: `npm run lint`
- build: `npm run build`
- run application in ts watch mode: `npm run watch`
- testing with jasmine: `npm run test`
- start application: `npm start`

**INFO for testing:** If the jasmine test fails the last command on the test-script `db-migrate reset` don't run. How ever why!? In this case you have to `db-migrate reset` manually after the test to emptying the test database.

## Usage

In Terminal run `npm start` on the root directory.

You can find all Endpoints described in the `REQUIREMENTS.md` with request method, route and request body information.

## Ports

The application run local on localhost.

App-Server uses port: 3000

DB-Server uses port: 5432

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database.

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!
