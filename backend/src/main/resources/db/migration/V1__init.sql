CREATE TABLE users (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(255) UNIQUE,
    created_at  TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE trips (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255) NOT NULL,
    location    VARCHAR(255) NOT NULL,
    radius_km   INTEGER NOT NULL DEFAULT 25,
    check_in    DATE NOT NULL,
    check_out   DATE NOT NULL,
    guests      INTEGER NOT NULL DEFAULT 1,
    vibe        VARCHAR(100),
    invite_code VARCHAR(20) UNIQUE NOT NULL,
    owner_id    UUID REFERENCES users(id),
    created_at  TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE trip_members (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id    UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_at  TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE (trip_id, user_id)
);

CREATE TABLE stays (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name         VARCHAR(255) NOT NULL,
    location     VARCHAR(255) NOT NULL,
    price_per_night NUMERIC(10, 2),
    image_url    TEXT,
    booking_url  TEXT,
    latitude     NUMERIC(9, 6),
    longitude    NUMERIC(9, 6),
    created_at   TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE swipes (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id    UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stay_id    UUID NOT NULL REFERENCES stays(id) ON DELETE CASCADE,
    liked      BOOLEAN NOT NULL,
    swiped_at  TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE (trip_id, user_id, stay_id)
);
