<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'stock',
        'unit',
        'cost_usd',
    ];

    protected $casts = [
        'stock'    => 'decimal:2',
        'cost_usd' => 'decimal:2',
    ];

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

    public function productionBatches()
    {
        return $this->hasMany(ProductionBatch::class);
    }

    public function batchInputs()
    {
        return $this->hasMany(BatchInput::class);
    }
}
