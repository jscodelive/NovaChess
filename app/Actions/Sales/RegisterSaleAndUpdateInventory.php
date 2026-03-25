<?php

namespace App\Actions\Sales;

use App\Exceptions\InsufficientStockException;
use App\Models\Sale;
use App\Models\Product;
use App\Models\AccountsReceivable;
use Illuminate\Support\Facades\DB;

class RegisterSaleAndUpdateInventory
{
    /**
     * Registra una venta, descuenta inventario y crea Cuentas por Cobrar si es fiado.
     * @param array $data Datos validados de la venta
     * @return Sale
     */
    public function execute(array $data): Sale
    {
        return DB::transaction(function () use ($data) {
            $product = Product::lockForUpdate()->find($data['product_id']);

            if (!$product || $product->stock < $data['quantity_kg']) {
                throw new InsufficientStockException($product ? $product->name : '');
            }

            // Descontar stock
            $product->stock -= $data['quantity_kg'];
            $product->save();

            // Calcular monto total
            $totalUsd = $data['quantity_kg'] * $data['price_usd'];

            // Registrar Venta
            $sale = Sale::create([
                'customer_name' => $data['customer_name'],
                'sale_date'     => $data['sale_date'],
                'product_id'    => $product->id,
                'quantity_kg'   => $data['quantity_kg'],
                'price_usd'     => $data['price_usd'],
                'total_usd'     => $totalUsd,
                'status'        => $data['status'],
            ]);

            // Si es 'credit' (fiado), crear registro en Cuentas por Cobrar
            if ($data['status'] === 'credit') {
                AccountsReceivable::create([
                    'sale_id'             => $sale->id,
                    'original_amount_usd' => $totalUsd,
                    'balance_usd'         => $totalUsd,
                    'due_date'            => $data['due_date'] ?? now()->addDays(30)->toDateString(),
                    'status'              => 'pending',
                ]);
            }

            return $sale;
        });
    }
}
