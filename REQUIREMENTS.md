# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index `[GET]` `/products`
- Show `[GET]` `/products/:id`
- Create [token required] `[POST]` `/products`

```
{
  "name": string,
  "price": number,
  "category": string
}
```

- Top 5 most popular products `[GET]` `/products/popular`
- Products by category (args: product category) `[GET]` `/products/category/:category`

#### Users

- Index [token required] `[GET]` `/users`
- Show [token required] `[GET]` `/users/:id`
- Create `[POST]` `/users`

```
{
  "user_name": string,
  "first_name": string,
  "last_name": string,
  "password": string
}
```

- Authenticate [token required] `[GET]` `/users/auth`

#### Orders

- Current Order by user (args: user id) [token required] `[GET]` `/orders/curr-by-user/:userId`

- Completed Orders by user (args: user id)[token required] `[GET]` `/orders/comp-by-user/:userId`

- Create [token required] `[POST]` `/orders/:userId`

- Update Order Status to complete [token required] `[PUT]` `/orders/update-status/:id`

- Add a Product [token required] `[POST]` `/orders/add-product`

```
{
  "order_id": string,
  "product_id": string,
  "quantity": number
}
```

- Update Quantity of a Product [token required] `[PUT]` `/orders/update-qty`

```
{
  "order_id": string,
  "product_id": string,
  "quantity": number
}
```

- Delete a Product [token required] `[DELETE]` `/orders/delete-product`

```
{
  "order_id": string,
  "product_id": string
}
```

## Data Shapes

#### Product

- id: number
- name: string
- price: number
- category: string

#### User

- id: number
- user_name: string
- first_name: string
- last_name: string
- password: string
- password_digest: string

#### Orders

- id: number
- user_id: string
- status: string (active or complete)
- order_id: string
- product_id: string
- quantity: number

## Tables

#### TABLE: products

- id SERIAL PRIMARY KEY
- name VARCHAR(200)
- price DECIMAL(10, 2)
- category VARCHAR(200)

#### TABLE: users

- id SERIAL PRIMARY KEY
- first_name VARCHAR(50)
- last_name VARCHAR(50)
- password_digest VARCHAR(80)

#### TABLE: orders

- id SERIAL PRIMARY KEY
- user_id BIGINT REFERENCES users(id)
- status VARCHAR(8)

#### TABLE: order_produtcs (join table)

- id SERIAL PRIMARY KEY
- order_id BIGINT REFERENCES orders(id)
- product_id BIGINT REFERENCES products(id)
- quantity INTEGER
