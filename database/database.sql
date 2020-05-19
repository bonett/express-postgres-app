CREATE TABLE users (
  id_user SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30),
  country VARCHAR(30)
);

INSERT INTO users(name, email, country) VALUES
    ('wilfrido', 'test@gmail.com', 'colombia')

CREATE TABLE events (
  id_event SERIAL PRIMARY KEY,
  title VARCHAR(30),
  description VARCHAR(120),
  picture VARCHAR(120)
);