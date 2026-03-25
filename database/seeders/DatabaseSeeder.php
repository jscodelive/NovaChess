<?php

namespace Database\Seeders;

use App\Models\ExchangeRate;
use App\Models\Product;
use App\Models\Provider;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::factory()->create([
            'name'  => 'Admin',
            'email' => 'admin@novachess.test',
        ]);

        // Tasa de cambio inicial
        ExchangeRate::create([
            'date'          => now()->toDateString(),
            'rate_bcv'      => 40.00,
            'rate_parallel' => 42.50,
        ]);

        // Proveedores de leche
        Provider::factory(5)->create();

        // Quesos y materias primas
        Product::factory()->create(['name' => 'Queso Blanco Duro', 'type' => 'cheese', 'stock' => 50.00, 'cost_usd' => 4.50]);
        Product::factory()->create(['name' => 'Queso Mano',        'type' => 'cheese', 'stock' => 30.00, 'cost_usd' => 5.00]);
        Product::factory()->create(['name' => 'Cuajo Líquido',     'type' => 'input',  'stock' => 10.00, 'cost_usd' => 2.00]);
        Product::factory()->create(['name' => 'Sal Refinada',      'type' => 'input',  'stock' => 100.00,'cost_usd' => 0.50]);
    }
}
