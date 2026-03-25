<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePaymentRequest;
use App\Models\AccountsReceivable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AccountsReceivableController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = AccountsReceivable::with('sale:id,customer_name,sale_date,total_usd');

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $receivables = $query->latest('due_date')->paginate(20);

        return response()->json($receivables);
    }

    public function show(AccountsReceivable $accountsReceivable): JsonResponse
    {
        return response()->json(
            $accountsReceivable->load('sale:id,customer_name,sale_date,product_id,total_usd')
        );
    }

    /**
     * Registra un abono parcial o total.
     */
    public function pay(StorePaymentRequest $request, AccountsReceivable $accountsReceivable): JsonResponse
    {
        $amount = $request->validated()['amount_usd'];

        if ($amount > $accountsReceivable->balance_usd) {
            return response()->json(['message' => 'El monto excede el saldo pendiente.'], 422);
        }

        $accountsReceivable->balance_usd -= $amount;
        $accountsReceivable->status = $accountsReceivable->balance_usd <= 0 ? 'paid' : 'partial';
        $accountsReceivable->save();

        return response()->json($accountsReceivable->load('sale:id,customer_name'));
    }
}
