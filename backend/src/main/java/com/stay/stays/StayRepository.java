package com.stay.stays;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface StayRepository extends JpaRepository<Stay, UUID> {

    @Query("SELECT s FROM Stay s WHERE s.vibeTags LIKE %:vibe%")
    List<Stay> findByVibe(@Param("vibe") String vibe);
}
