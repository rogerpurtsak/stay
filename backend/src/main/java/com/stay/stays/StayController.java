package com.stay.stays;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/stays")
public class StayController {

    private final StayService stayService;

    public StayController(StayService stayService) {
        this.stayService = stayService;
    }

    @GetMapping
    public List<Stay> getAll() {
        return stayService.getAll();
    }

    @GetMapping("/{id}")
    public Stay getStay(@PathVariable UUID id) {
        return stayService.getById(id);
    }
}
