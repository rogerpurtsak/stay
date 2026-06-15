package com.stay.stays;

import com.stay.common.ResourceNotFoundException;
import com.stay.trips.Trip;
import com.stay.trips.TripRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class StayService {

    private final StayRepository stayRepository;
    private final TripRepository tripRepository;

    public StayService(StayRepository stayRepository, TripRepository tripRepository) {
        this.stayRepository = stayRepository;
        this.tripRepository = tripRepository;
    }

    public StayResponse getById(UUID id) {
        Stay stay = stayRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stay not found"));
        return StayResponse.from(stay);
    }

    public List<StayResponse> getStaysForTrip(UUID tripId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        List<Stay> stays = (trip.getVibe() != null && !trip.getVibe().isBlank())
                ? stayRepository.findByVibe(trip.getVibe())
                : stayRepository.findAll();

        if (trip.getLatitude() != null && trip.getLongitude() != null) {
            stays = stays.stream()
                    .filter(s -> s.getLatitude() != null && s.getLongitude() != null)
                    .filter(s -> haversineKm(trip.getLatitude(), trip.getLongitude(),
                            s.getLatitude(), s.getLongitude()) <= trip.getRadiusKm())
                    .toList();
        }

        return stays.stream().map(StayResponse::from).toList();
    }

    private double haversineKm(BigDecimal lat1, BigDecimal lon1, BigDecimal lat2, BigDecimal lon2) {
        double R = 6371;
        double dLat = Math.toRadians(lat2.doubleValue() - lat1.doubleValue());
        double dLon = Math.toRadians(lon2.doubleValue() - lon1.doubleValue());
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1.doubleValue()))
                * Math.cos(Math.toRadians(lat2.doubleValue()))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }
}
