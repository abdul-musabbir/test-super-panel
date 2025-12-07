<?php

declare(strict_types=1);

use Domains\RecentBooking\Actions\ApprovedBooking;
use Domains\RecentBooking\Pages\ManageRecentBookingPage;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:superadmin'])
    ->prefix('/recent-bookings')
    ->name('recentBooking.')
    ->group(function () {
        Route::get('/', ManageRecentBookingPage::class)->name('manage');

        // approved booking
        Route::post('/{webhookLog}/approve', ApprovedBooking::class)->name('approved.booking');
    });
