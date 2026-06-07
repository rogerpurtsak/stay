package com.stay.trips;

import java.time.LocalDate;

public record CreateTripRequest(String locationName, int radiusKm, int guests, String vibe, LocalDate startDate, LocalDate endDate) {

}
