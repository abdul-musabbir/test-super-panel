<?php

declare(strict_types=1);

use Domains\Webhook\Actions\WebhookAction;
use Domains\Webhook\Actions\WebhookReceiver;
use Illuminate\Support\Facades\Route;

Route::post('/webhook', WebhookAction::class)->name('webhook');

// Public endpoint for external services
Route::post('/webhook/{webhook}', WebhookReceiver::class)->name('webhook.receive');

// Routes for authenticated users
// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/user/webhooks/generate', [WebhookController::class, 'generate']);
//     Route::get('/user/webhooks', [WebhookController::class, 'index']);
// });
