package com.stay.trips;

import com.stay.common.ResourceNotFoundException;
import com.stay.tripmembers.TripMember;
import com.stay.tripmembers.TripMemberRepository;
import com.stay.users.User;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TripService {

    private final TripRepository tripRepository;
    private final TripMemberRepository tripMemberRepository;

    public TripService(TripRepository tripRepository, TripMemberRepository tripMemberRepository) {
        this.tripRepository = tripRepository;
        this.tripMemberRepository = tripMemberRepository;
    }

    public Trip getById(UUID id) {
        return tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));
    }

    public Trip getByInviteCode(String inviteCode) {
        return tripRepository.findByInviteCode(inviteCode)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));
    }

    public String generateInviteCode() {

        String code;
        do {
        code = UUID.randomUUID().toString().replace("-", "").substring(0, 6);
        } while (tripRepository.findByInviteCode(code).isPresent());
        return code;

    }

    public CreateTripResponse createTrip(User user, CreateTripRequest request) {
        String inviteCode = generateInviteCode();
        Trip trip = new Trip();
        trip.setLocationName(request.locationName());
        trip.setRadiusKm(request.radiusKm());
        trip.setGuests(request.guests());
        trip.setVibe(request.vibe());
        trip.setStartDate(request.startDate());
        trip.setEndDate(request.endDate());
        trip.setInviteCode(inviteCode);
        trip.setCreatedByUserId(user.getId());

        Trip saved = tripRepository.save(trip);

        TripMember member = new TripMember();

        member.setTripId(saved.getId());
        member.setUserId(user.getId());
        member.setDisplayName(user.getDisplayName());
        tripMemberRepository.save(member);

        return new CreateTripResponse(saved.getId(), saved.getInviteCode());
    }

    public JoinTripResponse joinTrip(String inviteCode, JoinTripRequest request, User currentUser) {
        Trip trip = tripRepository.findByInviteCode(inviteCode)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        TripMember member = new TripMember();
        member.setTripId(trip.getId());

        if (currentUser != null) {
            member.setUserId(currentUser.getId());
            member.setDisplayName(currentUser.getDisplayName());
        } else {
            if (request.guestToken() == null || request.guestToken().isBlank()) {
                throw new IllegalArgumentException("Guest token is required");
            }
            member.setGuestToken(request.guestToken());
            member.setDisplayName(request.displayName());
        }

        tripMemberRepository.save(member);

        return new JoinTripResponse(trip.getId(), trip.getInviteCode(), trip.getLocationName());
    }

    public TripDetailResponse getTripDetail(UUID tripId) {
        Trip trip = getById(tripId);
        List<TripMember> members = tripMemberRepository.findByTripId(tripId);
        return new TripDetailResponse(trip.getId(), trip.getLocationName(), trip.getGuests(), members);
    }
}
