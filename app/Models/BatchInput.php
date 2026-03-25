<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BatchInput extends Model
{
    use HasFactory;

    protected $fillable = [
        'production_batch_id',
        'product_id',
        'quantity',
    ];

    protected $casts = [
        'quantity' => 'decimal:2',
    ];

    public function productionBatch()
    {
        return $this->belongsTo(ProductionBatch::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
