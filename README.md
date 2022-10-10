# restful-products-api
Example RESTful API for Falabella products

## Environment

Before running the application with any method, you will need to setup the environment variables. To do that replace the values on the file `.env.example` and rename the file to `.env`.

|  Variable name | Description |
|---|---|
| DB_NAME | The name of your SQL Database |
| DB_HOST | The host where the SQL Database is running. NOT REQUIRED WHEN USING DOCKER COMPOSE|
| DB_USER | The user of the SQL Database |
| DB_PASSWORD | The password of your SQL Database |

## Docker Excecution

For a quick start, the preferred method is using Docker and docker-compose. A Docker installation is required.

```
docker-compose up
```

Once the command finishes, you will be able to use the API on `http://localhost:3000`

## Local Execution

<em>Note: The local execution requires you to have installed a MySQL Server with the same parameters you specified in the environment variables. Also you will need to run the script `src/database/init.sql` to start create the tables and add some test data.</em>

Run the NodeJS server

```
npm install
npm run dev
```

Once the command finishes, you will be able to use the API on `http://localhost:3000`

Run the tests suite
```
npm run test
```

## Endpoints

* /api/v1/products
    - Method: GET
    - Description: Obtain all the products
* /api/v1/products/:productId
    - Method: GET
    - Description: Obtain the product with the id :productId
* /api/v1/products
    - Method: POST
    - Description: Creates a new product
    - Required data:
    ```
    {
        sku, // STRING - ID del producto
        name, // STRING - Nombre del producto
        brand, // STRING - Marca del producto
        size, // STRING - Tamaño del producto (opcional)
        price, // NUMBER - Precio del producto
        images // STRING ARRAY - URL de imagenes del producto (opcional)
    }
    ```
* /api/v1/products/:productId
    - Method: PATCH
    - Description: Updates the product with the id :productId
    - Required data:
    ```
    {
        name, // STRING - Nombre del producto
        brand, // STRING - Marca del producto
        size, // STRING - Tamaño del producto (opcional)
        price, // NUMBER - Precio del producto
        images // STRING ARRAY - URL de imagenes del producto (opcional)
    }
    ```
* /api/v1/products/:productId
    - Method: DELETE
    - Description: Deletes the product with the id :productId

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