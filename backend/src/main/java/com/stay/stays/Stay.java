package com.stay.stays;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "stays")
public class Stay {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String locationName;

    private BigDecimal latitude;
    private BigDecimal longitude;
    private BigDecimal priceFrom;
    private BigDecimal rating;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String bookingUrl;
    private String vibeTags;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @OneToMany(mappedBy = "stay", fetch = FetchType.LAZY)
    @OrderBy("sortOrder ASC")
    private List<StayImage> images = new ArrayList<>();

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getLocationName() { return locationName; }
    public BigDecimal getLatitude() { return latitude; }
    public BigDecimal getLongitude() { return longitude; }
    public BigDecimal getPriceFrom() { return priceFrom; }
    public BigDecimal getRating() { return rating; }
    public String getDescription() { return description; }
    public String getBookingUrl() { return bookingUrl; }
    public String getVibeTags() { return vibeTags; }
    public Instant getCreatedAt() { return createdAt; }
    public List<StayImage> getImages() { return images; }
}
