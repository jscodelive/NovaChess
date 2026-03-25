<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductionBatchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_id'       => ['required', 'integer', 'exists:products,id'],
            'production_date'  => ['required', 'date'],
            'volume_milk_used' => ['required', 'numeric', 'min:0.01'],
            'yield_kg'         => ['required', 'numeric', 'min:0.01'],
            'notes'            => ['nullable', 'string'],
            'inputs'           => ['nullable', 'array'],
            'inputs.*.product_id' => ['required_with:inputs', 'integer', 'exists:products,id'],
            'inputs.*.quantity'   => ['required_with:inputs', 'numeric', 'min:0.01'],
        ];
    }
}
