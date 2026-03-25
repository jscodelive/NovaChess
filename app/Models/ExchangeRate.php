<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExchangeRate extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'rate_bcv',
        'rate_parallel',
    ];

    protected $casts = [
        'date'          => 'date',
        'rate_bcv'      => 'decimal:6',
        'rate_parallel' => 'decimal:6',
    ];
}
