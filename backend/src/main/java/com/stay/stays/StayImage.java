package com.stay.stays;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "stay_images")
public class StayImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stay_id", nullable = false)
    private Stay stay;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String imageUrl;

    @Column(nullable = false)
    private int sortOrder;

    public UUID getId() { return id; }
    public Stay getStay() { return stay; }
    public String getImageUrl() { return imageUrl; }
    public int getSortOrder() { return sortOrder; }
}
