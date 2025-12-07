<?php

declare(strict_types=1);

use Domains\Webhook\Actions\StoreWebhook;
use Domains\Webhook\Pages\ManageWebhookPage;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('/webhooks')->name('webhooks.')->group(function () {
    Route::get('/', ManageWebhookPage::class)->name('manage');

    //
    Route::post('/store', StoreWebhook::class)->name('store');
});
