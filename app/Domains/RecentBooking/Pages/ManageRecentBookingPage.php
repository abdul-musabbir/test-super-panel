<?php

declare(strict_types=1);

namespace Domains\RecentBooking\Pages;

use App\Helpers\QueryBuilderHelper;
use App\Models\WebhookLog;
use Inertia\Inertia;
use Inertia\Response;

class ManageRecentBookingPage
{
    public function __invoke(): Response
    {
        // dd($this->getRecentBookings());

        return Inertia::render(component: 'recent-bookings/manage-recent-booking-page', props: [
            'recentBookings' => $this->getRecentBookings(),
        ]);
    }

    private function getRecentBookings(): array
    {
        $query = WebhookLog::query();

        QueryBuilderHelper::apply(
            query: $query,
            request: request(),
            searchable: ['name'],
            filterable: ['name'],
            sortable: ['email']
        );

        // Eager load the webhook relationship and its user relationship with specific columns
        $recentBookings = $query
            // ->where(column: 'event_type', operator: '=', value: 'booking_form')
            ->select(columns: ['id', 'user_webhook_id', 'event_type', 'source', 'payload', 'status', 'created_at'])
            ->with(relations: [
                'webhook:id,user_id,name,webhook_url',
                'webhook.user:id,name,email,avatar',
            ])
            ->paginate(perPage: request()->integer(key: 'per_page', default: 10))
            ->withQueryString()
            ->through(callback: function (WebhookLog $recentBooking): array {
                return [
                    'id' => $recentBooking->id,
                    'status' => $recentBooking->status,

                    // Restaurant Info
                    'restaurantInfo' => $recentBooking->webhook?->user ? [
                        'id' => $recentBooking->webhook->user->id,
                        'name' => $recentBooking->webhook->user->name,
                        'email' => $recentBooking->webhook->user->email,
                        'avatar' => $recentBooking->webhook->user->avatar,
                    ] : null,

                    // booking info
                    'bookingInfo' => [
                        'date' => $recentBooking->payload['fields']['date']['value'] ?? null,
                        'time' => $recentBooking->payload['fields']['reservation_time']['value'] ?? null,
                        'guest' => $recentBooking->payload['fields']['reservation_guests']['value'] ?? null,
                        'bookingDate' => $recentBooking->created_at ?? null,
                    ],

                    // contact info
                    'contactInfo' => [
                        'name' => $recentBooking->payload['fields']['reservation_nimi']['value'] ?? null,
                        'email' => $recentBooking->payload['fields']['reservation_email']['value'] ?? null,
                        'phone' => $recentBooking->payload['fields']['reservation_puhelin']['value'] ?? null,
                    ],

                    // message
                    'message' => $recentBooking->payload['fields']['reservation_viesti']['value'] ?? null,
                ];
            });

        return [
            'paginatedResults' => $recentBookings,
            'activeFilters' => QueryBuilderHelper::getFilters(request: request()),
        ];
    }
}
