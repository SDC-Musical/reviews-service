# Reviews Service

> A service that handles and displays the review information on a product page.

## Related Projects

  - https://github.com/Team-Structure/images-service
  - https://github.com/Team-Structure/Product-Information-Service
  - https://github.com/Team-Structure/seller-catalog

## Table of Contents

1. [Requirements](#requirements)
2. [Usage](#usage)
3. [Development](#development)
4. [Product-API](#product-api)
5. [Database-Management](#database-management)
6. [Cache](#cache)

## Requirements

- Node.js
- MongoDB

## Usage

1. Clone this repo and go to its root directory.
1. Run `npm install` to install its dependencies.
1. After the dependencies are installed, seed the database with `npm run db:seed`
1. Once the database is seeded, run `npm run build:dev` to build the browser components.
1. After building the components, run `npm run start:dev` to start the application.
1. You will then be able to access the app at **localhost:3001/products/{product_id}** where **{product_id}** is the Product ID number.

The database seeding script `npm run db:seed` seeds Product ID numbers between 1 - 100 so going to http://localhost:3001/products/1 will show review information for the Product with a Product ID of 1.

## Development

If you would like to contribute to this project, please fork this repository and propose your changes via a Pull Request.

You can install the project's dependencies by going to the root directory of the project and running `npm install`.

#### Currently Developed using...
- Node v12.18.3
- npm v6.14.6
- MongoDB v4.4

### Dependencies
- Express
- React/React Router/react-onclickoutside
- Styled-Components
- Mongoose
### Development Dependencies
- Webpack/Babel
- Jest/Enzyme/SuperTest/Mongodb-Memory-Server
- ESLint w/ Airbrb Style Guide

Refer to package.json file in the root directory for dependency version numbers.

## Product-API
- GET /:product_id/summary returns a summary of reviews for product
- GET /:product_id returns reviews for product
- PUT /:product_id updates reviews for product and if change was made
- POST /:product_id adds a review for product and returns review
- DELETE /:product_id removes all reviews for product and returns success message
- IMPORTANT ---- For PUT and DELETE the product_id refers to the review itself rather than the product it is associated with.

## Database Management
- Download PostgreSQL
- Start PostgreSQL in Terminal: pg_ctl -D /usr/local/var/postgres start
- Create database: createdb product_reviews
- Open database in PostgreSQL: psql product_reviews
- Paste the following into the PostgreSQL command line: CREATE TABLE reviews(
  id serial PRIMARY KEY,
  product_id integer NOT NULL,
  username text NOT NULL,
  review_heading text NOT NULL,
  review_text text NOT NULL,
  review_rating smallint NOT NULL,
  created_at timestamp without time zone NOT NULL
);
- In terminal run: npm run db:seed
- Once complete switch back to the PostgreSQL command line and run: COPY reviews FROM ‘{path to csv file}’ WITH DELIMITER ',' CSV HEADER;
- To reduce query times run the following in PostgreSQL command line: CREATE INDEX idx_reviews_product ON reviews(product_id);

## Cache
- Download Redis
- Edit redis.conf with the following:
- On line 861 add: maxmemory {amount you want to cache (ex. 100mb)}
- On line 892 add: maxmemory-policy allkeys-lru
- Navigate to the redis folder in Terminal and type: src/redis-server {path to redis.conf file}