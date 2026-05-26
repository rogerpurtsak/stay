package com.stay.trips;

import org.springframework.web.bind.annotation.*;
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
}
