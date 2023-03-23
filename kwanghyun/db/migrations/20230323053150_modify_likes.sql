-- migrate:up
ALTER TABLE likes ADD CONSTRAINT unique_userid UNIQUE (user_id);
ALTER TABLE likes ADD CONSTRAINT unique_postid UNIQUE (post_id);


-- migrate:down
ALTER TABLE likes DROP CONSTRAINT unique_userid;
ALTER TABLE likes DROP CONSTRAINT unique_postid;
