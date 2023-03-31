-- migrate:up
CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY,
    profile_image varchar(1000) NULL,
    username VARCHAR(100) NOT NULL,
    age INT NULL,
    email VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- migrate:down
DROP TABLE users;


