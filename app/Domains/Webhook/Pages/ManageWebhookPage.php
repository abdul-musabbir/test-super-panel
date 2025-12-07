<?php

declare(strict_types=1);

namespace Domains\Webhook\Pages;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ManageWebhookPage
{
    public function __invoke(): Response
    {
        return Inertia::render('webhooks/manage-webhook-page', [
            'webhooks' => $this->getWebhooks(),
        ]);
    }

    private function getWebhooks()
    {
        return Auth::user()->webhooks()->select(['id', 'name', 'webhook_url'])->get();
    }
}
