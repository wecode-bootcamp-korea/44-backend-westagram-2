-- migrate:up
ALTER TABLE posts ADD COLUMN posting_image_url VARCHAR(1000) NULL;
-- migrate:down
ALTER TABLE posts DROP COLUMN posting_image_url;
