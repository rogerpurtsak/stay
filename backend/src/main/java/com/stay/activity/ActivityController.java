package com.stay.activity;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/trips/{tripId}/activity")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping
    public List<ActivityEvent> getActivity(@PathVariable UUID tripId) {
        return activityService.getActivity(tripId);
    }
}
