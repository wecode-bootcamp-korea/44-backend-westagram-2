-- migrate:up
ALTER TABLE users ADD COLUMN password varchar(200) NOT NUll;

-- migrate:down
ALTER TABLE users DROP COLUMN password
