<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExchangeRateRequest;
use App\Models\ExchangeRate;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;

class ExchangeRateController extends Controller
{
    public function index(): JsonResponse
    {
        $rates = ExchangeRate::orderBy('date', 'desc')->paginate(30);

        return response()->json($rates);
    }

    public function store(StoreExchangeRateRequest $request): JsonResponse
    {
        $rate = ExchangeRate::create($request->validated());

        Cache::forget('current_exchange_rate');

        return response()->json($rate, 201);
    }

    public function current(): JsonResponse
    {
        $rate = ExchangeRate::orderBy('date', 'desc')->first();

        if (!$rate) {
            return response()->json(['message' => 'No hay tasa de cambio registrada.'], 404);
        }

        return response()->json($rate);
    }

    public function fetchBcv(): JsonResponse
    {
        $exitCode = Artisan::call('bcv:fetch');

        if ($exitCode !== 0) {
            return response()->json(['message' => 'No se pudo obtener la tasa del BCV.'], 502);
        }

        $rate = ExchangeRate::orderBy('date', 'desc')->first();

        return response()->json($rate);
    }
}
