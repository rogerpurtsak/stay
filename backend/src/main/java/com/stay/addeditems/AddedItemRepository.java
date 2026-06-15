package com.stay.addeditems;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface AddedItemRepository extends JpaRepository<AddedItem, UUID> {
    List<AddedItem> findByTripIdOrderByCreatedAtDesc(UUID tripId);
}
