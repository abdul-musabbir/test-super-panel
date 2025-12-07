<?php

declare(strict_types=1);

namespace Domains\Webhook\Actions;

use Domains\Webhook\Data\WebhookFormData;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class StoreWebhook
{
    use AsAction;

    public function rules(): array
    {
        return [
            'webhookName' => ['required', 'string', 'min:1', 'max:30'],
        ];
    }

    public function handle(WebhookFormData $data)
    {
        $user = Auth::user();

        $webhook = $user->webhooks()->create([
            'name' => $data->webhookName,
            'webhook_url' => \Illuminate\Support\Str::uuid(),
        ]);
    }
}
