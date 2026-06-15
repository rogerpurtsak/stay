package com.stay.swipes;

import com.stay.users.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/trips/{tripId}/swipes")
public class SwipeController {

    private final SwipeService swipeService;

    public SwipeController(SwipeService swipeService) {
        this.swipeService = swipeService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void swipe(
            @PathVariable UUID tripId,
            @AuthenticationPrincipal User user,
            @RequestBody SwipeRequest request) {
        swipeService.createSwipe(tripId, user.getId(), request);
    }
}
