<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * User with Super Administrator role
         */
        DB::table('users')->insert(
            [
                'id' => 1,
                'name' => 'superadmin',
                'email' => 'superadmin@example.com',
                'email_verified_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'password' => '$2y$10$XjR6hLupeE7G68RO6eaRnOhozlY7xUUrerUjPua6Y8ab9C0hTRY5O', // 123
                'remember_token' => Str::random(10),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'role_id' => 1
            ]
        );
    }
}
