-- migrate:up

ALTER TABLE likes ADD FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE;
-- migrate:down

