<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'     => 'Producto ' . $this->faker->unique()->numberBetween(1, 99999),
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
