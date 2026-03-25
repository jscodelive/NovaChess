<?php

namespace App\Http\Controllers\Api;

use App\Actions\Sales\RegisterSaleAndUpdateInventory;
use App\Exceptions\InsufficientStockException;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSaleRequest;
use App\Models\Sale;
use Illuminate\Http\JsonResponse;

class SaleController extends Controller
{
    public function index(): JsonResponse
    {
        $sales = Sale::with('product')->latest('sale_date')->paginate(20);

        return response()->json($sales);
    }

    public function store(StoreSaleRequest $request, RegisterSaleAndUpdateInventory $action): JsonResponse
    {
        try {
            $sale = $action->execute($request->validated());

            return response()->json($sale->load('product', 'accountsReceivable'), 201);
        } catch (InsufficientStockException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    public function show(Sale $sale): JsonResponse
    {
        return response()->json($sale->load('product', 'accountsReceivable'));
    }
}
