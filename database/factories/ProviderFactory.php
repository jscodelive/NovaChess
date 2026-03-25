<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProviderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'        => $this->faker->company(),
            'document_id' => 'J-' . $this->faker->numerify('########'),
            'phone'       => $this->faker->phoneNumber(),
            'address'     => $this->faker->address(),
            'is_active'   => true,
        ];
    }
}
