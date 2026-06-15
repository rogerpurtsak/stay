package com.stay.trips;

import com.stay.stays.StayResponse;
import java.util.List;
import java.util.UUID;

public record MemberLikedResponse(
    UUID memberId,
    String displayName,
    boolean isGuest,
    List<StayResponse> likedStays
) {}
