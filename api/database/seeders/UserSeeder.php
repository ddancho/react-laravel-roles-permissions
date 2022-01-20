<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->count(10)->has(Task::factory()->count(3))->create();
    }
}
