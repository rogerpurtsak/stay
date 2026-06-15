package com.stay.activity;

import java.time.Instant;

public record ActivityEvent(
    String type,
    String actorName,
    String description,
    Instant occurredAt
) {}
