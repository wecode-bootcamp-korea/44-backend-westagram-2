-- migrate:up
ALTER TABLE likes ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- migrate:down

