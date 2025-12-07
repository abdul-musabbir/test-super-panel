<?php

declare(strict_types=1);

use Domains\Client\Actions\DeleteClient;
use Domains\Client\Actions\StoreClient;
use Domains\Client\Actions\UpdateClient;
use Domains\Client\Pages\ManageClientPage;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:superadmin'])->prefix('/clients')->name('clients.')->group(function () {
    Route::get('/', ManageClientPage::class)->name('manage');

    //
    Route::post('/store', StoreClient::class)->name('store');

    //
    Route::patch('/{client}/update', UpdateClient::class)->name('update');

    //
    Route::patch('/{client}/destroy', DeleteClient::class)->name('destroy');
});
