package com.stay.swipes;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface SwipeRepository extends JpaRepository<Swipe, UUID> {
    List<Swipe> findByTripIdAndUserId(UUID tripId, UUID userId);
    List<Swipe> findByTripIdAndLikedTrue(UUID tripId);
}
