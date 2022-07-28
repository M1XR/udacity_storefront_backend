# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- **Index**

  - `[GET]`
  - `/api/products`

- **Show**

  - `[GET]`
  - `/api/products/:id`

- **Create** [token required]

  - `[POST]`
  - `/api/products`
  - Request Body:

  ```
  {
    "name": string,
    "price": number,
    "category": string,
  }
  ```

- **Top 5 most popular products**

  - `[GET]`
  - `/api/products-popular`

- **Products by category** (args: product category)

  - `[GET]`
  - `/api/products-category/:category`

#### Users

- **Index** [token required]

  - `[GET]`
  - `/api/users`

- **Show** [token required]

  - `[GET]`
  - `/api/users/:id`

- **Create** [token required]

  - `[POST]`
  - `/api/users`
  - Request Body:

  ```
  {
    "user_name": string,
    "first_name": string,
    "last_name": string,
    "password": string
  }
  ```

#### Orders

- **Current Order by user** (args: user id) [token required]

  - `[GET]`
  - `/api/orders-current/:user_id`

- **Completed Orders by user** (args: user id) [token required]

  - `[GET]`
  - `/api/orders-completed/:user_id`

## Data Shapes

#### products

| id                 | name         | price   | category     |
| ------------------ | ------------ | ------- | ------------ |
| SERIAL PRIMARY KEY | VARCHAR(200) | INTEGER | VARCHAR(200) |

#### users

| id                 | user_name   | first_name  | last_name   | password    |
| ------------------ | ----------- | ----------- | ----------- | ----------- |
| SERIAL PRIMARY KEY | VARCHAR(50) | VARCHAR(50) | VARCHAR(50) | VARCHAR(80) |

#### orders

| id                 | user_id                     | status     |
| ------------------ | --------------------------- | ---------- |
| SERIAL PRIMARY KEY | BIGINT REFERENCES users(id) | VARCHAR(8) |

#### order_products (Join-Table)

| id                 | order_id                     | product_id                    | quantity |
| ------------------ | ---------------------------- | ----------------------------- | -------- |
| SERIAL PRIMARY KEY | BIGINT REFERENCES orders(id) | BIGINT REFERENCES product(id) | INTEGER  |
