<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductionBatchRequest;
use App\Models\BatchInput;
use App\Models\Product;
use App\Models\ProductionBatch;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ProductionBatchController extends Controller
{
    public function index(): JsonResponse
    {
        $batches = ProductionBatch::with('product:id,name', 'inputs.product:id,name')
            ->latest('production_date')
            ->paginate(20);

        return response()->json($batches);
    }

    public function store(StoreProductionBatchRequest $request): JsonResponse
    {
        $data = $request->validated();

        $batch = DB::transaction(function () use ($data) {
            $batch = ProductionBatch::create([
                'product_id'       => $data['product_id'],
                'production_date'  => $data['production_date'],
                'volume_milk_used' => $data['volume_milk_used'],
                'yield_kg'         => $data['yield_kg'],
                'notes'            => $data['notes'] ?? null,
            ]);

            // Incrementar stock del queso producido
            $product = Product::lockForUpdate()->find($data['product_id']);
            $product->stock += $data['yield_kg'];
            $product->save();

            // Registrar y descontar insumos usados
            if (!empty($data['inputs'])) {
                foreach ($data['inputs'] as $input) {
                    BatchInput::create([
                        'production_batch_id' => $batch->id,
                        'product_id'          => $input['product_id'],
                        'quantity'            => $input['quantity'],
                    ]);

                    $inputProduct = Product::lockForUpdate()->find($input['product_id']);
                    $inputProduct->stock -= $input['quantity'];
                    $inputProduct->save();
                }
            }

            return $batch;
        });

        return response()->json($batch->load('product:id,name', 'inputs.product:id,name'), 201);
    }

    public function show(ProductionBatch $productionBatch): JsonResponse
    {
        return response()->json(
            $productionBatch->load('product:id,name', 'inputs.product:id,name')
        );
    }
}
