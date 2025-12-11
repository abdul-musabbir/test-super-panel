<?php

declare(strict_types=1);

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
    // return to_route('dashboard');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function (Request $request) {
        $user = $request->user();

        // Check if user has the 'customer' role
        if ($user->hasRole('customer')) {
            return to_route('bookings.manage');
        }

        // Check if user has admin or staff role
        if ($user->hasRole(['admin', 'superadmin'])) {
            return to_route('clients.manage');
        }

        // Fallback - redirect to bookings by default
        return to_route('bookings.manage');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
