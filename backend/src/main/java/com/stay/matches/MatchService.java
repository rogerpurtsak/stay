package com.stay.matches;

import com.stay.stays.StayRepository;
import com.stay.stays.StayResponse;
import com.stay.swipes.Swipe;
import com.stay.swipes.SwipeRepository;
import com.stay.tripmembers.TripMemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MatchService {

    private final SwipeRepository swipeRepository;
    private final StayRepository stayRepository;
    private final TripMemberRepository tripMemberRepository;

    public MatchService(SwipeRepository swipeRepository,
                        StayRepository stayRepository,
                        TripMemberRepository tripMemberRepository) {
        this.swipeRepository = swipeRepository;
        this.stayRepository = stayRepository;
        this.tripMemberRepository = tripMemberRepository;
    }

    @Transactional(readOnly = true)
    public List<MatchResponse> getMatches(UUID tripId) {
        int memberCount = tripMemberRepository.findByTripId(tripId).size();
        List<Swipe> likes = swipeRepository.findByTripIdAndLikedTrue(tripId);

        Map<UUID, Long> likeCountByStay = likes.stream()
                .collect(Collectors.groupingBy(Swipe::getStayId, Collectors.counting()));

        return likeCountByStay.entrySet().stream()
                .filter(e -> e.getValue() >= 2)
                .sorted(Map.Entry.<UUID, Long>comparingByValue().reversed())
                .map(e -> {
                    int likedCount = e.getValue().intValue();
                    StayResponse stay = stayRepository.findById(e.getKey())
                            .map(StayResponse::from)
                            .orElse(null);
                    if (stay == null) return null;
                    int pct = memberCount > 0
                            ? (int) Math.round(likedCount * 100.0 / memberCount)
                            : 0;
                    return new MatchResponse(stay, likedCount, memberCount, pct, likedCount >= memberCount);
                })
                .filter(Objects::nonNull)
                .toList();
    }
}
