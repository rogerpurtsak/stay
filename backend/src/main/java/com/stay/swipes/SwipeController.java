package com.stay.swipes;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trips/{tripId}/swipes")
public class SwipeController {

    private final SwipeService swipeService;

    public SwipeController(SwipeService swipeService) {
        this.swipeService = swipeService;
    }
}
