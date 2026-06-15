package com.stay.trips;

import com.stay.tripmembers.MemberResponse;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record TripDetailResponse(
    UUID tripId,
    String inviteCode,
    String locationName,
    int guests,
    LocalDate startDate,
    LocalDate endDate,
    List<MemberResponse> members
) {}
