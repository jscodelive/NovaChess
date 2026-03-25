<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProviderRequest;
use App\Models\Provider;
use Illuminate\Http\JsonResponse;

class ProviderController extends Controller
{
    public function index(): JsonResponse
    {
        $providers = Provider::withCount('milkReceptions')
            ->orderBy('name')
            ->paginate(30);

        return response()->json($providers);
    }

    public function store(StoreProviderRequest $request): JsonResponse
    {
        $provider = Provider::create($request->validated());

        return response()->json($provider, 201);
    }

    public function show(Provider $provider): JsonResponse
    {
        return response()->json($provider->loadCount('milkReceptions'));
    }

    public function update(StoreProviderRequest $request, Provider $provider): JsonResponse
    {
        $provider->update($request->validated());

        return response()->json($provider);
    }
}
