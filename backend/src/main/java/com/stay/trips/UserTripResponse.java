package com.stay.trips;

import java.time.LocalDate;
import java.util.UUID;

public record UserTripResponse(
    UUID tripId,
    String inviteCode,
    String locationName,
    LocalDate startDate,
    LocalDate endDate,
    int guests,
    boolean isCreator,
    int memberCount
) {}
