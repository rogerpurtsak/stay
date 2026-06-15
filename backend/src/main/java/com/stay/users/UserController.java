package com.stay.users;

import com.stay.trips.TripService;
import com.stay.trips.UserTripResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final TripService tripService;

    public UserController(UserService userService, TripService tripService) {
        this.userService = userService;
        this.tripService = tripService;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable UUID id) {
        return userService.getById(id);
    }

    @GetMapping("/me/trips")
    public List<UserTripResponse> getMyTrips(@AuthenticationPrincipal User user) {
        return tripService.getTripsForUser(user.getId());
    }
}
