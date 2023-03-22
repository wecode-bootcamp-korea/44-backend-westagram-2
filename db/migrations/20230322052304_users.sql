-- migrate:up
CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(100) NOT NULL,
  email VARCHAR(50) NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
 
)

-- migrate:down

