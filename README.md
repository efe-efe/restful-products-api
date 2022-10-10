# restful-products-api
Example RESTful API for Falabella products

## Local Execution

To run the development environment, the following environment variables are mandatory (this variables are also specified on the `.env.example` file):

|  Variable name | Description |
|---|---|
| DB_NAME | The name of your SQL Database |
| DB_HOST | The host where the SQL Database is running |
| DB_USER | The user of the SQL Database |
| DB_PASSWORD | The password of your SQL Database |

Run the NodeJS server

```
npm install
npm run dev
```

Run the tests suite
```
npm run test
```

## Docker Excecution

For a quick start, the preferred method is using Docker and docker-compose. A Docker installation is required.

```
docker-compose up
```

Once the command finishes, you will be able to use the API on `http://localhost:3000`

## Endpoints

|  Endpoint | Method | Description |
|---|---|---|
| /api/v1/products | GET | Obtain all the products |
| /api/v1/products/:productId | GET | Obtain an specific product |
| /api/v1/products | POST | Create a new product |
| /api/v1/products/:productId | PATCH | Update an specific product |
| /api/v1/products/:productId | DELETE | Delete an specific product |

## Architecture

The application uses an architecture of three layers: Routes, Services and Controllers.

* Routes: Routes are a versioned set of modules in charge of delegating requests to the appropiate controller.
* Controllers: Controllers are in charge of managing validating the request, calling the appropiate services and formulate the responses.
* Services: Services are in charge of mutating the database and in most cases, returning the results of those mutations.

## Database

This application works in pair with a SQL Server relational database. The database can be created by running the file `src/database/init.sql` in the RDMBS console. The script will generate the `product` and `image` tables and insert some test data on them.

## Improvement points

* Initialize database using migrations.
* Use the migrations to restore the state of the database when running tests that mutates the database.
* Add Swagger for the API Endpoints documentation.
* Add limits and pagination to some Endpoints.
* Different database/endpoint configurations for different environments.
* Use a pool of connections to the Database instead of connecting each time it needs to be used.