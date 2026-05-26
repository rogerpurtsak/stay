package com.stay.tripmembers;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class TripMemberService {

    private final TripMemberRepository tripMemberRepository;

    public TripMemberService(TripMemberRepository tripMemberRepository) {
        this.tripMemberRepository = tripMemberRepository;
    }

    public List<TripMember> getByTripId(UUID tripId) {
        return tripMemberRepository.findByTripId(tripId);
    }
}
