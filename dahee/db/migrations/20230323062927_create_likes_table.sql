-- migrate:up
CREATE TABLE likes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT likes_user_post_id UNIQUE (user_id, post_id),
    CONSTRAINT likes_users_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT likes_posts_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id)
);


-- migrate:down

