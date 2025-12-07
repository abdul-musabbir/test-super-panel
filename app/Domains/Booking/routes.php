<?php

declare(strict_types=1);

use Domains\Booking\Actions\DeleteBookingEvent;
use Domains\Booking\Actions\StoreBookingEvent;
use Domains\Booking\Actions\UpdateBookingEvent;
use Domains\Booking\Pages\ManageBookingPage;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:customer'])->prefix('/bookings')->name('bookings.')->group(function () {
    Route::get('/', ManageBookingPage::class)->name('manage');

    //
    Route::post('/event-store', StoreBookingEvent::class)->name('event.store');

    //
    Route::patch('/event/{booking}/update', UpdateBookingEvent::class)->name('event.update');

    //
    Route::delete('/event/{booking}/destroy', DeleteBookingEvent::class)->name('event.destroy');
});
