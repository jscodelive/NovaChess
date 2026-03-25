<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMilkReceptionRequest;
use App\Models\MilkReception;
use Illuminate\Http\JsonResponse;

class MilkReceptionController extends Controller
{
    public function index(): JsonResponse
    {
        $receptions = MilkReception::with('provider')->latest('reception_date')->paginate(20);

        return response()->json($receptions);
    }

    public function store(StoreMilkReceptionRequest $request): JsonResponse
    {
        $reception = MilkReception::create($request->validated());

        return response()->json($reception->load('provider'), 201);
    }

    public function show(MilkReception $milkReception): JsonResponse
    {
        return response()->json($milkReception->load('provider'));
    }
}
