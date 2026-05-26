package com.stay.matches;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/trips/{tripId}/matches")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping
    public List<UUID> getMatches(@PathVariable UUID tripId) {
        return matchService.getMatchedStayIds(tripId);
    }
}
