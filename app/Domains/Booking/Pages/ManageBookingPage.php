<?php

declare(strict_types=1);

namespace Domains\Booking\Pages;

use Domains\Booking\Models\Booking;
use Inertia\Inertia;
use Inertia\Response;

class ManageBookingPage
{
    public function __invoke(): Response
    {
        return Inertia::render('bookings/manage-booking-page', [
            // এখানে bookings key এর নিচে exact shape-এ data যাচ্ছে
            'bookings' => $this->getBookings(),
        ]);
    }

    private function getBookings(): array
    {
        return Booking::query()
            ->get()
            ->map(function (Booking $booking) {
                return [
                    // ❗ key গুলো একদম তোমার example অনুযায়ী
                    'id' => (string) $booking->id,
                    'title' => $booking->title,
                    'description' => $booking->description,

                    // frontend আগে "2025-12-05T06:00:00.000Z" পাঠাচ্ছিল, তাই আমরাও ISO string পাঠাচ্ছি
                    'start' => $booking->start?->toIso8601String(),
                    'end' => $booking->end?->toIso8601String(),

                    'allDay' => (bool) $booking->all_day,

                    'color' => $booking->color ?? 'sky',
                    'location' => $booking->location,

                    'email' => $booking->email,
                    'phone' => $booking->phone,

                    'numberOfGuests' => (int) $booking->number_of_guests,

                    'status' => $booking->status,
                ];
            })
            ->all();
    }
}
