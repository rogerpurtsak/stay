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

    public List<Swipe> getLikedByTrip(UUID tripId) {
        return swipeRepository.findByTripIdAndLikedTrue(tripId);
    }
}
