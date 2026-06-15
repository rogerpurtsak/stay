package com.stay.tripmembers;

import java.util.UUID;

public record MemberResponse(UUID id, String displayName, boolean isGuest) {
    public static MemberResponse from(TripMember m) {
        return new MemberResponse(m.getId(), m.getDisplayName(), m.getUserId() == null);
    }
}
