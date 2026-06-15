package com.stay.swipes;

import java.util.UUID;

public record SwipeRequest(UUID stayId, boolean liked) {}
