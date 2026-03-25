<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'     => ['required', 'string', 'max:255'],
            'type'     => ['required', 'in:cheese,input'],
            'stock'    => ['required', 'numeric', 'min:0'],
            'unit'     => ['sometimes', 'string', 'max:20'],
            'cost_usd' => ['required', 'numeric', 'min:0'],
        ];
    }
}
