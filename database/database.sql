CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30),
  country VARCHAR(30)
);

INSERT INTO users(name, email, country) VALUES
    ('wilfrido', 'test@gmail.com', 'colombia')