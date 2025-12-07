<?php

declare(strict_types=1);

namespace Domains\Booking\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Booking extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'start',
        'end',
        'all_day',
        'color',
        'location',
        'email',
        'phone',
        'number_of_guests',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start' => 'datetime',
        'end' => 'datetime',
        'all_day' => 'boolean',
        'number_of_guests' => 'integer',
    ];

    /**
     * Available booking statuses.
     */
    const STATUS_CONFIRMED = 'confirmed';
    const STATUS_PENDING = 'pending';
    const STATUS_CANCELLED = 'cancelled';

    /**
     * Available colors.
     */
    const COLOR_SKY = 'sky';
    const COLOR_AMBER = 'amber';
    const COLOR_VIOLET = 'violet';
    const COLOR_ROSE = 'rose';
    const COLOR_EMERALD = 'emerald';
    const COLOR_ORANGE = 'orange';

    /**
     * Get the user that owns the booking.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all available statuses.
     */
    public static function getStatuses(): array
    {
        return [
            self::STATUS_CONFIRMED,
            self::STATUS_PENDING,
            self::STATUS_CANCELLED,
        ];
    }

    /**
     * Get all available colors.
     */
    public static function getColors(): array
    {
        return [
            self::COLOR_SKY,
            self::COLOR_AMBER,
            self::COLOR_VIOLET,
            self::COLOR_ROSE,
            self::COLOR_EMERALD,
            self::COLOR_ORANGE,
        ];
    }

    /**
     * Scope a query to only include bookings for a specific user.
     */
    public function scopeForUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to only include confirmed bookings.
     */
    public function scopeConfirmed($query)
    {
        return $query->where('status', self::STATUS_CONFIRMED);
    }

    /**
     * Scope a query to only include pending bookings.
     */
    public function scopePending($query)
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    /**
     * Scope a query to only include cancelled bookings.
     */
    public function scopeCancelled($query)
    {
        return $query->where('status', self::STATUS_CANCELLED);
    }

    /**
     * Scope a query to filter by date range.
     */
    public function scopeBetweenDates($query, $startDate, $endDate)
    {
        return $query->whereBetween('start', [$startDate, $endDate]);
    }

    /**
     * Scope a query to get upcoming bookings.
     */
    public function scopeUpcoming($query)
    {
        return $query->where('start', '>=', now());
    }

    /**
     * Scope a query to get past bookings.
     */
    public function scopePast($query)
    {
        return $query->where('start', '<', now());
    }

    /**
     * Scope a query to get today's bookings.
     */
    public function scopeToday($query)
    {
        return $query->whereDate('start', today());
    }

    /**
     * Check if booking is confirmed.
     */
    public function isConfirmed(): bool
    {
        return $this->status === self::STATUS_CONFIRMED;
    }

    /**
     * Check if booking is pending.
     */
    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    /**
     * Check if booking is cancelled.
     */
    public function isCancelled(): bool
    {
        return $this->status === self::STATUS_CANCELLED;
    }

    /**
     * Confirm the booking.
     */
    public function confirm(): bool
    {
        return $this->update(['status' => self::STATUS_CONFIRMED]);
    }

    /**
     * Cancel the booking.
     */
    public function cancel(): bool
    {
        return $this->update(['status' => self::STATUS_CANCELLED]);
    }

    /**
     * Set booking to pending.
     */
    public function setPending(): bool
    {
        return $this->update(['status' => self::STATUS_PENDING]);
    }

    /**
     * Get the duration of the booking in hours.
     */
    public function getDurationInHours(): float
    {
        return $this->start->diffInHours($this->end);
    }

    /**
     * Get the duration of the booking in minutes.
     */
    public function getDurationInMinutes(): int
    {
        return $this->start->diffInMinutes($this->end);
    }

    /**
     * Check if booking is today.
     */
    public function isToday(): bool
    {
        return $this->start->isToday();
    }

    /**
     * Check if booking is upcoming (in the future).
     */
    public function isUpcoming(): bool
    {
        return $this->start->isFuture();
    }

    /**
     * Check if booking is in the past.
     */
    public function isPast(): bool
    {
        return $this->start->isPast();
    }

    /**
     * Check if booking conflicts with another booking.
     */
    public function hasConflict(?int $excludeId = null): bool
    {
        $query = static::query()
            ->where('status', '!=', self::STATUS_CANCELLED)
            ->where(function ($q) {
                $q->whereBetween('start', [$this->start, $this->end])
                    ->orWhereBetween('end', [$this->start, $this->end])
                    ->orWhere(function ($q) {
                        $q->where('start', '<=', $this->start)
                            ->where('end', '>=', $this->end);
                    });
            });

        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        return $query->exists();
    }

    /**
     * Get formatted start time.
     */
    public function getFormattedStartTimeAttribute(): string
    {
        return $this->start->format('h:i A');
    }

    /**
     * Get formatted end time.
     */
    public function getFormattedEndTimeAttribute(): string
    {
        return $this->end->format('h:i A');
    }

    /**
     * Get formatted date.
     */
    public function getFormattedDateAttribute(): string
    {
        return $this->start->format('F d, Y');
    }

    /**
     * Get formatted date and time range.
     */
    public function getFormattedDateTimeRangeAttribute(): string
    {
        if ($this->all_day) {
            return $this->start->format('F d, Y').' (All Day)';
        }

        return $this->start->format('F d, Y h:i A').' - '.$this->end->format('h:i A');
    }

    /**
     * Get status badge color for UI.
     */
    public function getStatusColorAttribute(): string
    {
        return match ($this->status) {
            self::STATUS_CONFIRMED => 'green',
            self::STATUS_PENDING => 'yellow',
            self::STATUS_CANCELLED => 'red',
            default => 'gray',
        };
    }
}
