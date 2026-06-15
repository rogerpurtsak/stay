package com.stay.addeditems;

import com.stay.users.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/trips/{tripId}/items")
public class AddedItemController {

    private final AddedItemService addedItemService;

    public AddedItemController(AddedItemService addedItemService) {
        this.addedItemService = addedItemService;
    }

    @GetMapping
    public List<AddedItemResponse> getItems(@PathVariable UUID tripId) {
        return addedItemService.getByTripId(tripId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AddedItemResponse addItem(
            @PathVariable UUID tripId,
            @RequestBody AddedItemRequest request,
            @AuthenticationPrincipal User user) {
        return addedItemService.addItem(tripId, user, request);
    }

    @DeleteMapping("/{itemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItem(
            @PathVariable UUID tripId,
            @PathVariable UUID itemId,
            @AuthenticationPrincipal User user) {
        addedItemService.deleteItem(itemId, user.getId());
    }
}
