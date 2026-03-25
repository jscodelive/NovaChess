<?php

use App\Actions\Sales\RegisterSaleAndUpdateInventory;
use App\Exceptions\InsufficientStockException;
use App\Models\AccountsReceivable;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(Tests\TestCase::class, RefreshDatabase::class);

beforeEach(function () {
    $this->action = new RegisterSaleAndUpdateInventory();
});

it('registers a paid sale and deducts stock', function () {
    $product = Product::factory()->create([
        'type'  => 'cheese',
        'stock' => 10.00,
    ]);

    $data = [
        'customer_name' => 'Juan Pérez',
        'sale_date'     => now()->toDateString(),
        'product_id'    => $product->id,
        'quantity_kg'   => 3.00,
        'price_usd'     => 5.00,
        'status'        => 'paid',
    ];

    $sale = $this->action->execute($data);

    expect($sale)->toBeInstanceOf(Sale::class)
        ->and($sale->total_usd)->toEqual('15.00')
        ->and($sale->status)->toBe('paid');

    expect($product->fresh()->stock)->toEqual('7.00');
    expect(AccountsReceivable::where('sale_id', $sale->id)->exists())->toBeFalse();
});

it('registers a credit sale and creates accounts receivable', function () {
    $product = Product::factory()->create([
        'type'  => 'cheese',
        'stock' => 10.00,
    ]);

    $dueDate = now()->addDays(30)->toDateString();

    $data = [
        'customer_name' => 'María García',
        'sale_date'     => now()->toDateString(),
        'product_id'    => $product->id,
        'quantity_kg'   => 2.00,
        'price_usd'     => 8.00,
        'status'        => 'credit',
        'due_date'      => $dueDate,
    ];

    $sale = $this->action->execute($data);

    expect($sale->status)->toBe('credit');

    $receivable = AccountsReceivable::where('sale_id', $sale->id)->first();
    expect($receivable)->not->toBeNull()
        ->and($receivable->original_amount_usd)->toEqual('16.00')
        ->and($receivable->balance_usd)->toEqual('16.00')
        ->and($receivable->status)->toBe('pending')
        ->and($receivable->due_date->toDateString())->toBe($dueDate);
});

it('sets default due date 30 days from now for credit sales without due_date', function () {
    $product = Product::factory()->create([
        'type'  => 'cheese',
        'stock' => 5.00,
    ]);

    $data = [
        'customer_name' => 'Pedro López',
        'sale_date'     => now()->toDateString(),
        'product_id'    => $product->id,
        'quantity_kg'   => 1.00,
        'price_usd'     => 10.00,
        'status'        => 'credit',
    ];

    $sale = $this->action->execute($data);

    $receivable = AccountsReceivable::where('sale_id', $sale->id)->first();
    expect($receivable->due_date->toDateString())->toBe(now()->addDays(30)->toDateString());
});

it('throws InsufficientStockException when stock is too low', function () {
    $product = Product::factory()->create([
        'type'  => 'cheese',
        'stock' => 1.00,
    ]);

    $data = [
        'customer_name' => 'Ana Rodríguez',
        'sale_date'     => now()->toDateString(),
        'product_id'    => $product->id,
        'quantity_kg'   => 5.00,
        'price_usd'     => 5.00,
        'status'        => 'paid',
    ];

    expect(fn () => $this->action->execute($data))
        ->toThrow(InsufficientStockException::class);
});

it('throws InsufficientStockException when product does not exist', function () {
    $data = [
        'customer_name' => 'Carlos Torres',
        'sale_date'     => now()->toDateString(),
        'product_id'    => 9999,
        'quantity_kg'   => 1.00,
        'price_usd'     => 5.00,
        'status'        => 'paid',
    ];

    expect(fn () => $this->action->execute($data))
        ->toThrow(InsufficientStockException::class);
});

it('rolls back transaction on failure leaving stock unchanged', function () {
    $product = Product::factory()->create([
        'type'  => 'cheese',
        'stock' => 2.00,
    ]);

    $originalStock = $product->stock;

    $data = [
        'customer_name' => 'Luis Fernández',
        'sale_date'     => now()->toDateString(),
        'product_id'    => $product->id,
        'quantity_kg'   => 10.00,
        'price_usd'     => 5.00,
        'status'        => 'paid',
    ];

    try {
        $this->action->execute($data);
    } catch (InsufficientStockException) {
        // expected
    }

    expect($product->fresh()->stock)->toEqual($originalStock);
    expect(Sale::count())->toBe(0);
});
