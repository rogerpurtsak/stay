package com.stay.tripmembers;

import com.stay.users.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @DeleteMapping("/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void leave(@PathVariable UUID tripId, @AuthenticationPrincipal User user) {
        tripMemberService.leave(tripId, user.getId());
    }
}
