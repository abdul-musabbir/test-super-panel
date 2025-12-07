<?php

declare(strict_types=1);

namespace Domains\Webhook\Actions;

use Domains\Webhook\Models\Webhook;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Lorisleiva\Actions\Concerns\AsAction;

class WebhookAction
{
    use AsAction;

    public function handle(Request $request): JsonResponse
    {
        try {
            // Store the webhook
            $webhook = Webhook::create([
                'event_type' => $request->input('event_type') ?? $request->input('type') ?? 'unknown',
                'source' => $request->input('source') ?? 'default',
                'payload' => $request->all(),
                'headers' => $request->headers->all(),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'status' => 'pending',
            ]);

            // Log the webhook
            Log::info('Webhook received and stored', [
                'webhook_id' => $webhook->id,
                'event_type' => $webhook->event_type,
            ]);

            // Process the webhook (you can do this in a job for better performance)
            // $this->processWebhook($webhook);

            return response()->json([
                'status' => 'success',
                'message' => 'Webhook received',
                'webhook_id' => $webhook->id,
            ], 200);

        } catch (\Exception $e) {
            Log::error('Webhook handling failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to process webhook',
            ], 500);
        }
    }
}
