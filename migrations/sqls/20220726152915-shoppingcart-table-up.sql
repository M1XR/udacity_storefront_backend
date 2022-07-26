CREATE TABLE shoppingcart (
  _id SERIAL PRIMARY KEY,
  order_id BIGINT REFERENCES orders(_id),
  product_id BIGINT REFERENCES products(_id),
  quantity INTEGER
);