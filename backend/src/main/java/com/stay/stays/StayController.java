package com.stay.stays;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class StayController {

    private final StayService stayService;

    public StayController(StayService stayService) {
        this.stayService = stayService;
    }

    @GetMapping("/stays/{id}")
    public StayResponse getStay(@PathVariable UUID id) {
        return stayService.getById(id);
    }

    @GetMapping("/trips/{tripId}/stays")
    public List<StayResponse> getStaysForTrip(@PathVariable UUID tripId) {
        return stayService.getStaysForTrip(tripId);
    }
}
