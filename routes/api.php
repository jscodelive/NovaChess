<?php

use App\Http\Controllers\Api\AccountsReceivableController;
use App\Http\Controllers\Api\ExchangeRateController;
use App\Http\Controllers\Api\MilkReceptionController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductionBatchController;
use App\Http\Controllers\Api\ProviderController;
use App\Http\Controllers\Api\SaleController;
use Illuminate\Support\Facades\Route;

Route::middleware('inject.exchange.rate')->group(function () {
    Route::apiResource('sales', SaleController::class)->only(['index', 'store', 'show']);
    Route::apiResource('milk-receptions', MilkReceptionController::class)->only(['index', 'store', 'show']);
    Route::apiResource('products', ProductController::class)->only(['index', 'store', 'show', 'update']);
    Route::apiResource('providers', ProviderController::class)->only(['index', 'store', 'show', 'update']);
    Route::apiResource('production-batches', ProductionBatchController::class)->only(['index', 'store', 'show']);

    Route::get('accounts-receivable', [AccountsReceivableController::class, 'index']);
    Route::get('accounts-receivable/{accountsReceivable}', [AccountsReceivableController::class, 'show']);
    Route::post('accounts-receivable/{accountsReceivable}/pay', [AccountsReceivableController::class, 'pay']);
});

Route::prefix('exchange-rates')->group(function () {
    Route::get('/', [ExchangeRateController::class, 'index']);
    Route::post('/', [ExchangeRateController::class, 'store']);
    Route::get('/current', [ExchangeRateController::class, 'current']);
    Route::post('/fetch-bcv', [ExchangeRateController::class, 'fetchBcv']);
});
