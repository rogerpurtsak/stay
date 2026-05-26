package com.stay.addeditems;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trips/{tripId}/items")
public class AddedItemController {

    private final AddedItemService addedItemService;

    public AddedItemController(AddedItemService addedItemService) {
        this.addedItemService = addedItemService;
    }
}
