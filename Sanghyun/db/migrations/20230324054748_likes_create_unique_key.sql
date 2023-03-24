-- migrate:up
ALTER TABLE likes ADD UNIQUE (user_id, post_id);

-- migrate:down
ALTER TABLE likes DROP INDEX user_id_post_id;
