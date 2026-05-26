package com.stay.tripmembers;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface TripMemberRepository extends JpaRepository<TripMember, UUID> {
    List<TripMember> findByTripId(UUID tripId);
    boolean existsByTripIdAndUserId(UUID tripId, UUID userId);
}
