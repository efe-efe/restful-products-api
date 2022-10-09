# restful-products-api
Example RESTful API for Falabella products

## Architecture

The application uses an architecture of three layers: Routes, Services and Controllers.

* Routes: Routes are a versioned set of modules in charge of delegating requests to the appropiate controller.
* Controllers: Controllers are in charge of managing validating the request, calling the appropiate services and formulate the responses.
* Services: Services are in charge of mutating the database and in most cases, returning the results of those mutations.
