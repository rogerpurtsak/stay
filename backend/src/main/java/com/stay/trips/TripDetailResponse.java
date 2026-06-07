package com.stay.trips;

import java.util.List;
import java.util.UUID;

import com.stay.tripmembers.TripMember;

public record TripDetailResponse(UUID tripId, String locationName, int guests, List<TripMember> members) {
    
}
