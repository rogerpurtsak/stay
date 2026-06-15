package com.stay.addeditems;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "trip_added_items")
public class AddedItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "trip_id", nullable = false)
    private UUID tripId;

    @Column(name = "added_by_user_id")
    private UUID addedByUserId;

    @Column(name = "added_by_display_name", nullable = false)
    private String addedByDisplayName;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false)
    private String title;

    private String notes;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public UUID getId() { return id; }
    public UUID getTripId() { return tripId; }
    public void setTripId(UUID tripId) { this.tripId = tripId; }
    public UUID getAddedByUserId() { return addedByUserId; }
    public void setAddedByUserId(UUID addedByUserId) { this.addedByUserId = addedByUserId; }
    public String getAddedByDisplayName() { return addedByDisplayName; }
    public void setAddedByDisplayName(String addedByDisplayName) { this.addedByDisplayName = addedByDisplayName; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public Instant getCreatedAt() { return createdAt; }
}
