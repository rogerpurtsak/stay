package com.stay.addeditems;

import com.stay.common.ResourceNotFoundException;
import com.stay.users.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AddedItemService {

    private final AddedItemRepository repository;

    public AddedItemService(AddedItemRepository repository) {
        this.repository = repository;
    }

    public List<AddedItemResponse> getByTripId(UUID tripId) {
        return repository.findByTripIdOrderByCreatedAtDesc(tripId)
                .stream().map(AddedItemResponse::from).toList();
    }

    public AddedItemResponse addItem(UUID tripId, User user, AddedItemRequest request) {
        AddedItem item = new AddedItem();
        item.setTripId(tripId);
        item.setAddedByUserId(user.getId());
        item.setAddedByDisplayName(user.getDisplayName());
        item.setUrl(request.url());
        item.setTitle(request.title());
        item.setNotes(request.notes());
        return AddedItemResponse.from(repository.save(item));
    }

    public void deleteItem(UUID itemId, UUID userId) {
        AddedItem item = repository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));
        if (!userId.equals(item.getAddedByUserId())) {
            throw new IllegalStateException("Not allowed");
        }
        repository.delete(item);
    }
}
