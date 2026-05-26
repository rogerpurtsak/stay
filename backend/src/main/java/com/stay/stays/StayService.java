package com.stay.stays;

import com.stay.common.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class StayService {

    private final StayRepository stayRepository;

    public StayService(StayRepository stayRepository) {
        this.stayRepository = stayRepository;
    }

    public List<Stay> getAll() {
        return stayRepository.findAll();
    }

    public Stay getById(UUID id) {
        return stayRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stay not found"));
    }
}
