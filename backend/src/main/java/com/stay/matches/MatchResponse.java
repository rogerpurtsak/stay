package com.stay.matches;

import com.stay.stays.StayResponse;

public record MatchResponse(
    StayResponse stay,
    int likedCount,
    int memberCount,
    int popularityPercentage,
    boolean isPerfectMatch
) {}
