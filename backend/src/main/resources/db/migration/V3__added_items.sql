CREATE TABLE trip_added_items (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id               UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    added_by_user_id      UUID REFERENCES users(id) ON DELETE SET NULL,
    added_by_display_name VARCHAR(255) NOT NULL,
    url                   TEXT NOT NULL,
    title                 VARCHAR(255) NOT NULL,
    notes                 TEXT,
    created_at            TIMESTAMP NOT NULL DEFAULT now()
);
