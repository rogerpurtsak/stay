package com.stay.stays;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface StayRepository extends JpaRepository<Stay, UUID> {
}
