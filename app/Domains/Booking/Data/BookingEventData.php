<?php

declare(strict_types=1);

namespace Domains\Booking\Data;

use Spatie\LaravelData\Data;

class BookingEventData extends Data
{
    public function __construct(
        // frontend generated id – optional, only if you need it
        public ?string $id,
        public string $name,
        public ?string $message,
        public string $start,
        public string $end,
        // public bool $allDay,
        public ?string $color,
        public ?string $location,
        public string $email,
        public string $phone,
        public int $numberOfGuests,
        public string $status,
    ) {}
}
