-- migrate:up
ALTER TABLE users ADD UNIQUE KEY email_uniq (email)


-- migrate:down

