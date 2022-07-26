CREATE TABLE orders (
  _id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(_id),
  status VARCHAR(8)
);