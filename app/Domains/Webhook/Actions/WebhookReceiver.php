<?php

declare(strict_types=1);

namespace Domains\Webhook\Actions;

use App\Models\UserWebhook;
use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;

class WebhookReceiver
{
    use AsAction;

    public function handle(UserWebhook $webhook, Request $request)
    {
        if (! $webhook) {
            return response()->json(['error' => 'Invalid webhook'], 404);
        }

        $log = $webhook->logs()->create([
            'event_type' => $request->input('event_type'),
            'source' => $request->input('source', 'custom'),
            'payload' => $request->all(),
            'headers' => $request->headers->all(),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'status' => 'pending',
        ]);

        return response()->json(['success' => true, 'log_id' => $log->id]);
    }
}
