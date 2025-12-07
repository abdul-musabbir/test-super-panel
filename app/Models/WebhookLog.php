<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebhookLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_webhook_id',
        'event_type',
        'source',
        'payload',
        'headers',
        'ip_address',
        'user_agent',
        'status',
        'error_message',
        'processed_at',
        'created_at',
    ];

    protected $casts = [
        'payload' => 'array',
        'headers' => 'array',
        'processed_at' => 'datetime',
    ];

    public function webhook()
    {
        return $this->belongsTo(UserWebhook::class, 'user_webhook_id');
    }
}
