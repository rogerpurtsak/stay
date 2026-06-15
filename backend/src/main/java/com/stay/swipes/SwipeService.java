package com.stay.swipes;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class SwipeService {

    private final SwipeRepository swipeRepository;

    public SwipeService(SwipeRepository swipeRepository) {
        this.swipeRepository = swipeRepository;
    }

    public void createSwipe(UUID tripId, UUID userId, SwipeRequest request) {
        if (swipeRepository.existsByTripIdAndUserIdAndStayId(tripId, userId, request.stayId())) {
            return;
        }
        Swipe swipe = new Swipe();
        swipe.setTripId(tripId);
        swipe.setUserId(userId);
        swipe.setStayId(request.stayId());
        swipe.setLiked(request.liked());
        swipeRepository.save(swipe);
    }

    public List<Swipe> getLikedByTrip(UUID tripId) {
        return swipeRepository.findByTripIdAndLikedTrue(tripId);
    }
}
