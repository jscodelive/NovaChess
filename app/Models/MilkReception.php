<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MilkReception extends Model
{
    use HasFactory;

    protected $fillable = [
        'provider_id',
        'reception_date',
        'volume_liters',
        'acidity',
        'temperature',
        'price_per_liter_usd',
    ];

    protected $casts = [
        'reception_date'      => 'date',
        'volume_liters'       => 'decimal:2',
        'acidity'             => 'decimal:2',
        'temperature'         => 'decimal:2',
        'price_per_liter_usd' => 'decimal:2',
    ];

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }
}
