<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExchangeRateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date'          => ['required', 'date', 'unique:exchange_rates,date'],
            'rate_bcv'      => ['required', 'numeric', 'min:0.000001'],
            'rate_parallel' => ['nullable', 'numeric', 'min:0.000001'],
        ];
    }
}
