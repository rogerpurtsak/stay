package com.stay.trips;

import com.stay.common.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class TripService {

    private final TripRepository tripRepository;

    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public Trip getById(UUID id) {
        return tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));
    }

    public Trip getByInviteCode(String inviteCode) {
        return tripRepository.findByInviteCode(inviteCode)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));
    }
}
