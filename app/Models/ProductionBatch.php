<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionBatch extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'production_date',
        'volume_milk_used',
        'yield_kg',
        'notes',
    ];

    protected $casts = [
        'production_date'  => 'date',
        'volume_milk_used' => 'decimal:2',
        'yield_kg'         => 'decimal:2',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function inputs()
    {
        return $this->hasMany(BatchInput::class);
    }
}
