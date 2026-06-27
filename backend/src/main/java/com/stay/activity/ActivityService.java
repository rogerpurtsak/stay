package com.stay.activity;

import com.stay.addeditems.AddedItemRepository;
import com.stay.stays.StayRepository;
import com.stay.swipes.Swipe;
import com.stay.swipes.SwipeRepository;
import com.stay.tripmembers.TripMember;
import com.stay.tripmembers.TripMemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ActivityService {

    private final SwipeRepository swipeRepository;
    private final StayRepository stayRepository;
    private final TripMemberRepository tripMemberRepository;
    private final AddedItemRepository addedItemRepository;

    public ActivityService(SwipeRepository swipeRepository,
                           StayRepository stayRepository,
                           TripMemberRepository tripMemberRepository,
                           AddedItemRepository addedItemRepository) {
        this.swipeRepository = swipeRepository;
        this.stayRepository = stayRepository;
        this.tripMemberRepository = tripMemberRepository;
        this.addedItemRepository = addedItemRepository;
    }

    @Transactional(readOnly = true)
    public List<ActivityEvent> getActivity(UUID tripId) {
        List<ActivityEvent> events = new ArrayList<>();

        Map<UUID, String> memberNames = tripMemberRepository.findByTripId(tripId).stream()
                .filter(m -> m.getUserId() != null)
                .collect(Collectors.toMap(TripMember::getUserId, TripMember::getDisplayName, (a, b) -> a));

        // JOIN events
        tripMemberRepository.findByTripId(tripId).forEach(member ->
                events.add(new ActivityEvent("JOIN", member.getDisplayName(),
                        member.getDisplayName() + " joined the trip", member.getJoinedAt())));

        // LIKE + MATCH events (single query)
        List<Swipe> likes = swipeRepository.findByTripIdAndLikedTrue(tripId);

        likes.forEach(swipe -> {
            String name = memberNames.getOrDefault(swipe.getUserId(), "Someone");
            stayRepository.findById(swipe.getStayId()).ifPresent(stay ->
                    events.add(new ActivityEvent("LIKE", name,
                            name + " liked " + stay.getName(), swipe.getSwipedAt())));
        });

        // MATCH events — when stay count hits 2 the match was born (2nd swipe's timestamp)
        likes.stream()
                .collect(Collectors.groupingBy(Swipe::getStayId))
                .entrySet().stream()
                .filter(e -> e.getValue().size() >= 2)
                .forEach(e -> {
                    Instant matchAt = e.getValue().stream()
                            .map(Swipe::getSwipedAt)
                            .sorted()
                            .skip(1)
                            .findFirst()
                            .orElse(Instant.now());
                    stayRepository.findById(e.getKey()).ifPresent(stay ->
                            events.add(new ActivityEvent("MATCH", null,
                                    "New match: " + stay.getName(), matchAt)));
                });

        // ADDED_ITEM events
        addedItemRepository.findByTripIdOrderByCreatedAtDesc(tripId).forEach(item ->
                events.add(new ActivityEvent("ADDED_ITEM", item.getAddedByDisplayName(),
                        item.getAddedByDisplayName() + " added “" + item.getTitle() + "”",
                        item.getCreatedAt())));

        events.sort(Comparator.comparing(ActivityEvent::occurredAt).reversed());
        return events;
    }
}
