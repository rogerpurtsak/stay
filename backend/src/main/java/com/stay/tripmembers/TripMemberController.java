package com.stay.tripmembers;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/trips/{tripId}/members")
public class TripMemberController {

    private final TripMemberService tripMemberService;

    public TripMemberController(TripMemberService tripMemberService) {
        this.tripMemberService = tripMemberService;
    }

    @GetMapping
    public List<TripMember> getMembers(@PathVariable UUID tripId) {
        return tripMemberService.getByTripId(tripId);
    }
}
