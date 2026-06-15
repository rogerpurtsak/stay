package com.stay.addeditems;

import java.time.Instant;
import java.util.UUID;

public record AddedItemResponse(
    UUID id,
    UUID tripId,
    UUID addedByUserId,
    String addedByDisplayName,
    String url,
    String title,
    String notes,
    Instant createdAt
) {
    public static AddedItemResponse from(AddedItem item) {
        return new AddedItemResponse(
            item.getId(), item.getTripId(), item.getAddedByUserId(),
            item.getAddedByDisplayName(), item.getUrl(), item.getTitle(),
            item.getNotes(), item.getCreatedAt()
        );
    }
}
