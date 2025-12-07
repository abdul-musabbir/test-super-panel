<?php

declare(strict_types=1);

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Domains\Booking\Models\Booking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Lab404\Impersonate\Models\Impersonate;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, HasRoles, Impersonate, Notifiable, SoftDeletes, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'contact_person',
        'phone',
        'email',
        'password',
        'street_address',
        'zip_code',
        'city',
        'country',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function webhooks()
    {
        return $this->hasMany(UserWebhook::class);
    }

    /**
     * Get all bookings for the user.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get confirmed bookings for the user.
     */
    public function confirmedBookings(): HasMany
    {
        return $this->hasMany(Booking::class)->confirmed();
    }

    /**
     * Get pending bookings for the user.
     */
    public function pendingBookings(): HasMany
    {
        return $this->hasMany(Booking::class)->pending();
    }

    /**
     * Get upcoming bookings for the user.
     */
    public function upcomingBookings(): HasMany
    {
        return $this->hasMany(Booking::class)->upcoming();
    }

    /**
     * Get past bookings for the user.
     */
    public function pastBookings(): HasMany
    {
        return $this->hasMany(Booking::class)->past();
    }

    /**
     * Get today's bookings for the user.
     */
    public function todayBookings(): HasMany
    {
        return $this->hasMany(Booking::class)->today();
    }
}
