<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMilkReceptionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'provider_id'         => ['required', 'integer', 'exists:providers,id'],
            'reception_date'      => ['required', 'date'],
            'volume_liters'       => ['required', 'numeric', 'min:0.01'],
            'acidity'             => ['nullable', 'numeric', 'min:0'],
            'temperature'         => ['nullable', 'numeric'],
            'price_per_liter_usd' => ['required', 'numeric', 'min:0'],
        ];
    }
}
