<?php

declare(strict_types=1);

namespace Domains\Webhook\Data;

use Spatie\LaravelData\Data;

class WebhookFormData extends Data
{
    public function __construct(
        public readonly string $webhookName
    ) {}
}
