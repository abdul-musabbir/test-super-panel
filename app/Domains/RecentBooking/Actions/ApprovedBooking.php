<?php

declare(strict_types=1);

namespace Domains\RecentBooking\Actions;

use App\Models\WebhookLog;
use Carbon\Carbon;
use Domains\Booking\Models\Booking;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Lorisleiva\Actions\Concerns\AsAction;

class ApprovedBooking
{
    use AsAction;

    public function handle(WebhookLog $webhookLog)
    {
        try {
            DB::transaction(function () use ($webhookLog) {
                $payload = $webhookLog->payload;
                $fields = $payload['fields'] ?? [];

                // Validate required fields
                $this->validatePayload($fields);

                // Get user from webhook
                $user = $webhookLog->webhook->user;

                // Parse dates
                $startDateTime = $this->parseDateTime(
                    $fields['date']['value'] ?? null,
                    $fields['reservation_time']['value'] ?? null
                );

                $endDateTime = $startDateTime->copy()->addHour();

                // Prepare booking data
                $bookingData = [
                    'title' => $fields['reservation_nimi']['value'] ?? 'Guest',
                    'description' => $fields['reservation_viesti']['value'] ?? null,
                    'start' => $startDateTime,
                    'end' => $endDateTime,
                    'all_day' => false,
                    'color' => $this->getValidColor($fields['color']['value'] ?? 'sky'),
                    'location' => $fields['location']['value'] ?? $fields['table']['value'] ?? null,
                    'email' => $fields['reservation_email']['value'],
                    'phone' => $fields['reservation_puhelin']['value'],
                    'number_of_guests' => (int) ($fields['reservation_guests']['value'] ?? 1),
                    'status' => 'confirmed', // Approved bookings are confirmed
                ];

                // Check if booking already exists (including soft deleted)
                $existingBooking = Booking::withTrashed()
                    ->where('user_id', $user->id)
                    ->where('email', $bookingData['email'])
                    ->where('start', $startDateTime)
                    ->first();

                if ($existingBooking) {
                    if ($existingBooking->trashed()) {
                        // Restore soft deleted booking
                        $existingBooking->restore();
                        $existingBooking->update($bookingData);

                        Log::info('Booking restored from soft delete', [
                            'booking_id' => $existingBooking->id,
                            'webhook_log_id' => $webhookLog->id,
                            'user_id' => $user->id,
                            'email' => $existingBooking->email,
                        ]);

                        $booking = $existingBooking;
                    } else {
                        // Update existing booking
                        $existingBooking->update($bookingData);

                        Log::info('Booking updated', [
                            'booking_id' => $existingBooking->id,
                            'webhook_log_id' => $webhookLog->id,
                            'user_id' => $user->id,
                            'email' => $existingBooking->email,
                        ]);

                        $booking = $existingBooking;
                    }
                } else {
                    // Create new booking
                    $booking = $user->bookings()->create($bookingData);

                    Log::info('New booking created', [
                        'booking_id' => $booking->id,
                        'webhook_log_id' => $webhookLog->id,
                        'user_id' => $user->id,
                        'title' => $booking->title,
                        'email' => $booking->email,
                        'start' => $booking->start->toDateTimeString(),
                        'guests' => $booking->number_of_guests,
                    ]);
                }

                // Update webhook log status
                $webhookLog->update([
                    'status' => 'approved',
                    'processed_at' => now(),
                ]);
            });

        } catch (\Throwable $e) {
            // Update webhook log with error
            $webhookLog->update([
                'status' => 'pending',
                'error_message' => $e->getMessage(),
                'processed_at' => now(),
            ]);

            Log::error('Failed to process booking', [
                'webhook_log_id' => $webhookLog->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'payload' => $webhookLog->payload,
            ]);

            throw $e;
        }
    }

    /**
     * Validate required payload fields.
     */
    private function validatePayload(array $fields): void
    {
        $requiredFields = [
            'reservation_email',
            'reservation_puhelin',
            'date',
            'reservation_time',
        ];

        foreach ($requiredFields as $field) {
            if (empty($fields[$field]['value'] ?? null)) {
                throw new \InvalidArgumentException("Missing required field: {$field}");
            }
        }

        // Validate email format
        if (! filter_var($fields['reservation_email']['value'], FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException('Invalid email format');
        }
    }

    /**
     * Parse date and time into Carbon instance.
     */
    private function parseDateTime(?string $date, ?string $time): Carbon
    {
        if (! $date || ! $time) {
            throw new \InvalidArgumentException('Date and time are required');
        }

        try {
            // Combine date and time
            $dateTimeString = $date.' '.$time;

            return Carbon::parse($dateTimeString);
        } catch (\Exception $e) {
            throw new \InvalidArgumentException("Invalid date or time format: {$e->getMessage()}");
        }
    }

    /**
     * Get valid color or default.
     */
    private function getValidColor(string $color): string
    {
        $validColors = Booking::getColors();

        return in_array($color, $validColors) ? $color : Booking::COLOR_SKY;
    }
}
