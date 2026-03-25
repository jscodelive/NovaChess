<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountsReceivable extends Model
{
    use HasFactory;

    protected $fillable = [
        'sale_id',
        'original_amount_usd',
        'balance_usd',
        'due_date',
        'status',
    ];

    protected $casts = [
        'due_date'            => 'date',
        'original_amount_usd' => 'decimal:2',
        'balance_usd'         => 'decimal:2',
    ];

    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }
}
