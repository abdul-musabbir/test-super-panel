<?php

declare(strict_types=1);

namespace Domains\Booking\Actions;

use Domains\Booking\Models\Booking;
use Lorisleiva\Actions\Concerns\AsAction;

class DeleteBookingEvent
{
    use AsAction;

    public function handle(Booking $booking)
    {
        $booking->delete();
    }
}
