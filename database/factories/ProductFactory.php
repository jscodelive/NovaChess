<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'     => $this->faker->words(2, true),
            'type'     => $this->faker->randomElement(['cheese', 'input']),
            'stock'    => $this->faker->randomFloat(2, 0, 100),
            'unit'     => 'kg',
            'cost_usd' => $this->faker->randomFloat(2, 1, 50),
        ];
    }

    public function cheese(): static
    {
        return $this->state(['type' => 'cheese']);
    }

    public function input(): static
    {
        return $this->state(['type' => 'input']);
    }
}
