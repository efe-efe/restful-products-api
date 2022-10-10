# restful-products-api
Example RESTful API for Falabella products

## Architecture

The application uses an architecture of three layers: Routes, Services and Controllers.

* Routes: Routes are a versioned set of modules in charge of delegating requests to the appropiate controller.
* Controllers: Controllers are in charge of managing validating the request, calling the appropiate services and formulate the responses.
* Services: Services are in charge of mutating the database and in most cases, returning the results of those mutations.

## Database

This application works in pair with a SQL Server relational database. The database can be created by running the file `src/database/init.sql` with on the RDMBS console. The script will generate the products table and insert some test data into it.

## Environment

The application requires some environment variables to run. Those variables are specified in the `.env.example` file.