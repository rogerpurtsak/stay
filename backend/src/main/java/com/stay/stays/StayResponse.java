package com.stay.stays;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record StayResponse(
    UUID id,
    String name,
    String locationName,
    BigDecimal latitude,
    BigDecimal longitude,
    BigDecimal priceFrom,
    BigDecimal rating,
    String description,
    String bookingUrl,
    List<String> vibeTags,
    List<String> imageUrls
) {
    public static StayResponse from(Stay stay) {
        List<String> tags = stay.getVibeTags() == null
            ? List.of()
            : List.of(stay.getVibeTags().split(","));

        List<String> images = stay.getImages().stream()
            .map(StayImage::getImageUrl)
            .toList();

        return new StayResponse(
            stay.getId(),
            stay.getName(),
            stay.getLocationName(),
            stay.getLatitude(),
            stay.getLongitude(),
            stay.getPriceFrom(),
            stay.getRating(),
            stay.getDescription(),
            stay.getBookingUrl(),
            tags,
            images
        );
    }
}
