<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSaleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer_name' => ['required', 'string', 'max:255'],
            'sale_date'     => ['required', 'date'],
            'product_id'    => ['required', 'integer', 'exists:products,id'],
            'quantity_kg'   => ['required', 'numeric', 'min:0.01'],
            'price_usd'     => ['required', 'numeric', 'min:0.01'],
            'status'        => ['required', 'in:paid,credit'],
            'due_date'      => ['required_if:status,credit', 'nullable', 'date', 'after_or_equal:sale_date'],
        ];
    }

    public function messages(): array
    {
        return [
            'due_date.required_if' => 'La fecha de vencimiento es obligatoria para ventas a crédito.',
        ];
    }
}
