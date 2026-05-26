ALTER TABLE users RENAME COLUMN name TO display_name;

ALTER TABLE users
    ADD COLUMN password_hash VARCHAR(255),
    ADD COLUMN updated_at    TIMESTAMP NOT NULL DEFAULT now();
