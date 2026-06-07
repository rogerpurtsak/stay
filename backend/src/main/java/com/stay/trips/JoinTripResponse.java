package com.stay.trips;

import java.util.UUID;

public record JoinTripResponse(UUID tripId, String inviteCode, String locationName) {}
