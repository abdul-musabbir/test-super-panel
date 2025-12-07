<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserWebhook extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'webhook_url'];

    public function getRouteKeyName()
    {
        return 'webhook_url';
    }

    public function logs()
    {
        return $this->hasMany(WebhookLog::class, 'user_webhook_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
