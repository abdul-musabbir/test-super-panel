<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class SuperadminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'musabbir.io@gmail.com'],
            [
                'name' => 'Super Admin',
                'password' => '11111111',
                'email_verified_at' => now(),
            ]
        );

        $user->assignRole('superadmin');
    }
}
