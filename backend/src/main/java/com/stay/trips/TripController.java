package com.stay.trips;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.stay.users.User;

import java.util.UUID;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping("/{id}")
    public Trip getTrip(@PathVariable UUID id) {
        return tripService.getById(id);
    }

    @GetMapping("/join/{inviteCode}")
    public Trip getTripByInviteCode(@PathVariable String inviteCode) {
        return tripService.getByInviteCode(inviteCode);
    }

    @PostMapping()
    public CreateTripResponse createTrip(@AuthenticationPrincipal User user, @RequestBody CreateTripRequest request) {
        return tripService.createTrip(user, request);

        
    }
}
