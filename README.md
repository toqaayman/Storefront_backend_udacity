# Storefront Backend Project

___Table of Contents___

- [Storefront Backend Project](#storefront-backend-project)
  - [Getting Started](#getting-started)
    - [Setup environment](#setup-environment)
  - [Running the application](#running-the-application)
  - [Running the unit tests](#running-the-unit-tests)
  - [Set up Database](#Set-up-Database)
    -[Create Databases](#Create-Databases)
    -[Migrate Database](#Migrate-Database)
  - [Built With](#built-with)

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

### Setup environment

First, create a `.env` file with all the required environment variables:
```bash
# .env
NODE_ENV=development
PORT=3000
# Set your database connection information here
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=storefront
DB_DATABASE_TEST=storefront_testing
DB_USER=databaseuser
DB_PASS=password
# user
BCRYPT_PASSWORD=Hashed-password
SALT_ROUNDS=10
TOKEN_SECRET=your-secret-token
```
## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing


Next, start the Postgres server on Docker:

```bash
db-migrate up
```
## Running the application
Use the following command to run the application in using node:

```bash
yarn start
```

The application will run on <http://localhost:3000/>

## Running the unit tests

Use the following command to run the unit tests:

```bash
yarn test
```
## Set up Database
### Create Databases
We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user 
    - `CREATE USER shopping_user WITH PASSWORD 'user1234';`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE storefront;`
    - `CREATE DATABASE storefront_testing;`
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c storefront`
        - `GRANT ALL PRIVILEGES ON DATABASE storefront TO shopping_user;`
    - Grant for test database
        - `\c storefront_testing`
        - `GRANT ALL PRIVILEGES ON DATABASE storefront_testing TO shopping_user;`

### Migrate Database
Navigate to the root directory and run the command below to migrate the database 

`db-migrate up`

## Built With
- [NodeJS] - The JavaScript runtime
- [Yarn] - The dependency manager
- [db-migrate] - The database migration tool
- [Express] - The web framework
- [TypeScript] - Types JS extension
- [Jasmine] - The unit testing framework
