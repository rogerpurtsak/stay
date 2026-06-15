package com.stay.swipes;

import com.stay.stays.StayResponse;
import com.stay.users.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/trips/{tripId}/liked")
public class LikedController {

    private final SwipeService swipeService;

    public LikedController(SwipeService swipeService) {
        this.swipeService = swipeService;
    }

    @GetMapping
    public List<StayResponse> getLiked(
            @PathVariable UUID tripId,
            @AuthenticationPrincipal User user) {
        return swipeService.getLikedStays(tripId, user.getId());
    }

    @DeleteMapping("/{stayId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void unlike(
            @PathVariable UUID tripId,
            @PathVariable UUID stayId,
            @AuthenticationPrincipal User user) {
        swipeService.unlike(tripId, user.getId(), stayId);
    }
}
