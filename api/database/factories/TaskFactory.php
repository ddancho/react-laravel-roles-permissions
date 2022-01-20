<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => Str::random(10),
            'description' => Str::random(60),
            'priority' => $this->faker->numberBetween(1, 5),
            'due_date' => $this->faker->dateTimeBetween('now', '+1 month')
        ];
    }
}
