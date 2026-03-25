<?php

use App\Http\Controllers\Api\ExchangeRateController;
use App\Http\Controllers\Api\MilkReceptionController;
use App\Http\Controllers\Api\SaleController;
use Illuminate\Support\Facades\Route;

Route::middleware('inject.exchange.rate')->group(function () {
    Route::apiResource('sales', SaleController::class)->only(['index', 'store', 'show']);
    Route::apiResource('milk-receptions', MilkReceptionController::class)->only(['index', 'store', 'show']);
});

Route::prefix('exchange-rates')->group(function () {
    Route::get('/', [ExchangeRateController::class, 'index']);
    Route::post('/', [ExchangeRateController::class, 'store']);
    Route::get('/current', [ExchangeRateController::class, 'current']);
});
