CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  password VARCHAR(80)
);