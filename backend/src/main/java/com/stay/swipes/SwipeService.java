package com.stay.swipes;

import com.stay.stays.StayRepository;
import com.stay.stays.StayResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class SwipeService {

    private final SwipeRepository swipeRepository;
    private final StayRepository stayRepository;

    public SwipeService(SwipeRepository swipeRepository, StayRepository stayRepository) {
        this.swipeRepository = swipeRepository;
        this.stayRepository = stayRepository;
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

    @Transactional(readOnly = true)
    public List<StayResponse> getLikedStays(UUID tripId, UUID userId) {
        return swipeRepository.findByTripIdAndUserIdAndLikedTrue(tripId, userId).stream()
                .map(swipe -> stayRepository.findById(swipe.getStayId())
                        .map(StayResponse::from)
                        .orElse(null))
                .filter(Objects::nonNull)
                .toList();
    }

    public void unlike(UUID tripId, UUID userId, UUID stayId) {
        swipeRepository.findByTripIdAndUserIdAndStayId(tripId, userId, stayId)
                .ifPresent(swipeRepository::delete);
    }
}
