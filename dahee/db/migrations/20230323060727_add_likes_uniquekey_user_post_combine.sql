-- migrate:up
ALTER TABLE likes ADD UNIQUE likes_user_post_id (user_id, post_id)

-- migrate:down

