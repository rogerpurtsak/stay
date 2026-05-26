package com.stay.swipes;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "swipes", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"trip_id", "user_id", "stay_id"})
})
public class Swipe {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "trip_id", nullable = false)
    private UUID tripId;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "stay_id", nullable = false)
    private UUID stayId;

    @Column(nullable = false)
    private boolean liked;

    @Column(nullable = false, updatable = false)
    private Instant swipedAt = Instant.now();

    public UUID getId() { return id; }
    public UUID getTripId() { return tripId; }
    public void setTripId(UUID tripId) { this.tripId = tripId; }
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
    public UUID getStayId() { return stayId; }
    public void setStayId(UUID stayId) { this.stayId = stayId; }
    public boolean isLiked() { return liked; }
    public void setLiked(boolean liked) { this.liked = liked; }
    public Instant getSwipedAt() { return swipedAt; }
}
