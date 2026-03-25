<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_name',
        'sale_date',
        'product_id',
        'quantity_kg',
        'price_usd',
        'total_usd',
        'status',
    ];

    protected $casts = [
        'sale_date'   => 'date',
        'quantity_kg' => 'decimal:2',
        'price_usd'   => 'decimal:2',
        'total_usd'   => 'decimal:2',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function accountsReceivable()
    {
        return $this->hasOne(AccountsReceivable::class);
    }
}
