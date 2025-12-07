<?php

declare(strict_types=1);

namespace Domains\Booking\Actions;

use Domains\Booking\Data\BookingEventData;
use Domains\Booking\Models\Booking;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Lorisleiva\Actions\Concerns\AsAction;

class UpdateBookingEvent
{
    use AsAction;

    /**
     * Validation rules for when this action is used as a controller.
     */
    public function rules(): array
    {
        return [
            'id' => ['nullable', 'string'],

            'name' => ['required', 'string', 'max:255'],
            'message' => ['nullable', 'string'],

            'start' => ['required', 'date'],
            'end' => ['required', 'date', 'after:start'],

            // 'allDay' => ['required', 'boolean'],

            'color' => ['nullable', 'string', 'max:50'],
            'location' => ['nullable', 'string', 'max:255'],

            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],

            'numberOfGuests' => ['required', 'integer', 'min:1'],

            'status' => ['required', 'in:pending,confirmed,cancel'],
        ];
    }

    /**
     * Core handler: gets a fully built DTO.
     */
    public function handle(Booking $booking, BookingEventData $data)
    {
        // dd($data);
        try {
            DB::transaction(function () use ($booking, $data) {
                // NB: এখানে database column নাম ধরে map করছি
                $booking->update([
                    'title' => $data->name,
                    'description' => $data->message,
                    'start' => $data->start,
                    'end' => $data->end,
                    'all_day' => false,
                    'color' => $data->color ?? 'sky',
                    'location' => $data->location,
                    'email' => $data->email,
                    'phone' => $data->phone,
                    'number_of_guests' => $data->numberOfGuests,
                    'status' => $data->status ?? 'pending',
                ]);
            });
        } catch (\Throwable $e) {
            Log::error('Failed to create booking', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            throw $e;
        }
    }
}
