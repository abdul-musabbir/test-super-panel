<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

// Only authenticated users
Route::middleware(['auth', 'verified'])->group(function () {

    // Protect START impersonation
    Route::get('impersonate/take/{id}', [
        'uses' => '\Lab404\Impersonate\Controllers\ImpersonateController@take',
        'as' => 'impersonate',
    ])
        ->middleware('canImpersonate');

    // Do NOT protect STOP impersonation
    Route::get('impersonate/leave', [
        'uses' => '\Lab404\Impersonate\Controllers\ImpersonateController@leave',
        'as' => 'impersonate.leave',
    ]);
});
