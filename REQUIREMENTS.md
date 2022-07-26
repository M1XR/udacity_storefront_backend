# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- **Index**

  - _HTTP Request Method:_ `[GET]`
  - _Endpoint:_ `/api/products`

- **Show**

  - _HTTP Request Method:_ `[GET]`
  - _Endpoint:_ `/api/products/:id`

- **Create** [token required]

  - _HTTP Request Method:_ `[POST]`
  - _Endpoint:_ `/api/products`
  - _Request Body_:

  ```
  {
    "name": "Product",
    "price": "100",
    "category": "Category",
  }
  ```

- [OPTIONAL] **Top 5 most popular products**

  - _HTTP Request Method:_ `[GET]`
  - _Endpoint:_ `/api/products/popular`

- [OPTIONAL] **Products by category** (args: product category)
  - _HTTP Request Method:_ `[GET]`
  - _Endpoint:_ `/api/products/category/:category`

#### Users

- **Index** [token required]

  - _HTTP Request Method:_ `[GET]`
  - _Endpoint:_ `/api/users`

- **Show** [token required]

  - _HTTP Request Method:_ `[GET]`
  - _Endpoint:_ `/api/users/:id`

- **Create** [token required]
  - _HTTP Request Method:_ `[POST]`
  - _Endpoint:_ `/api/users`
  - _Request Body_:
  ```
  {
    "user_name": "User",
    "first_name": "First",
    "last_name": "Last",
    "password": "password"
  }
  ```

#### Orders

- **Current Order by user** (args: user id) [token required]

  - _HTTP Request Method:_ `[GET]`
  - _Endpoint:_ `/api/orders/current/:user_id`

- [OPTIONAL] **Completed Orders by user** (args: user id) [token required]

  - _HTTP Request Method:_ `[GET]`
  - _Endpoint:_ `/api/orders/completed/:user_id`

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

| \_id               | name         | price   | category     |
| ------------------ | ------------ | ------- | ------------ |
| SERIAL PRIMARY KEY | VARCHAR(200) | INTEGER | VARCHAR(200) |

#### User

- id
- firstName
- lastName
- password

| \_id               | user_name   | first_name  | last_name   | password    |
| ------------------ | ----------- | ----------- | ----------- | ----------- |
| SERIAL PRIMARY KEY | VARCHAR(50) | VARCHAR(50) | VARCHAR(50) | VARCHAR(80) |

#### Orders

- id
- user_id
- status of order (active or complete)

| \_id               | user_id                       | status     |
| ------------------ | ----------------------------- | ---------- |
| SERIAL PRIMARY KEY | BIGINT REFERENCES users(\_id) | VARCHAR(8) |

#### Shoppingcart

- id
- order_id
- id of each product in the order
- quantity of each product in the order

| \_id               | order_id                       | product_id                      | quantity |
| ------------------ | ------------------------------ | ------------------------------- | -------- |
| SERIAL PRIMARY KEY | BIGINT REFERENCES orders(\_id) | BIGINT REFERENCES product(\_id) | INTEGER  |
