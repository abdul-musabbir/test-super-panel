<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();

            // Foreign key to users table
            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');

            $table->string('title'); // Customer name
            $table->text('description')->nullable(); // Special requests/notes
            $table->dateTime('start'); // Booking start date/time
            $table->dateTime('end'); // Booking end date/time
            $table->boolean('all_day')->default(false);
            $table->string('color')->default('sky'); // sky, amber, violet, rose, emerald, orange
            $table->string('location')->nullable(); // Table location/section
            $table->string('email'); // Customer email
            $table->string('phone'); // Customer phone
            $table->integer('number_of_guests'); // Party size
            $table->enum('status', ['confirmed', 'pending', 'cancelled'])->default('pending');
            $table->timestamps();
            $table->softDeletes(); // For soft delete functionality

            // Indexes for better query performance
            $table->index('user_id');
            $table->index('start');
            $table->index('end');
            $table->index('status');
            $table->index('email');
            $table->index(['user_id', 'status']);
            $table->index(['start', 'end']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
