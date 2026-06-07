package com.stay.trips;

import java.util.UUID;

public record CreateTripResponse(UUID tripId, String inviteCode) {
    
}
