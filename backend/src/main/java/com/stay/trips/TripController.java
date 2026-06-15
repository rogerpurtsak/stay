package com.stay.trips;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.stay.users.User;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping("/{id}")
    public TripDetailResponse getTrip(@PathVariable UUID id) {
        return tripService.getTripDetail(id);
    }

    @GetMapping("/join/{inviteCode}")
    public Trip getTripByInviteCode(@PathVariable String inviteCode) {
        return tripService.getByInviteCode(inviteCode);
    }

    @GetMapping("/{tripId}/member-liked")
    public List<MemberLikedResponse> getMemberLiked(@PathVariable UUID tripId) {
        return tripService.getMemberLiked(tripId);
    }

    @PostMapping
    public CreateTripResponse createTrip(@AuthenticationPrincipal User user, @RequestBody CreateTripRequest request) {
        return tripService.createTrip(user, request);
    }

    @PostMapping("/{inviteCode}/join")
    public JoinTripResponse joinTrip(
            @PathVariable String inviteCode,
            @RequestBody JoinTripRequest request,
            @AuthenticationPrincipal User currentUser) {
        return tripService.joinTrip(inviteCode, request, currentUser);
    }
}
