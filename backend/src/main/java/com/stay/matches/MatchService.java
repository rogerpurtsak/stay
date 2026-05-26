package com.stay.matches;

import com.stay.swipes.Swipe;
import com.stay.swipes.SwipeRepository;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MatchService {

    private final SwipeRepository swipeRepository;

    public MatchService(SwipeRepository swipeRepository) {
        this.swipeRepository = swipeRepository;
    }

    public List<UUID> getMatchedStayIds(UUID tripId) {
        List<Swipe> likes = swipeRepository.findByTripIdAndLikedTrue(tripId);

        Map<UUID, Long> likeCountByStay = likes.stream()
                .collect(Collectors.groupingBy(Swipe::getStayId, Collectors.counting()));

        return likeCountByStay.entrySet().stream()
                .filter(e -> e.getValue() >= 2)
                .map(Map.Entry::getKey)
                .toList();
    }
}
