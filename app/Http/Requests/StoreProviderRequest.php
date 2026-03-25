<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProviderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'        => ['required', 'string', 'max:255'],
            'document_id' => ['nullable', 'string', 'max:50'],
            'phone'       => ['nullable', 'string', 'max:30'],
            'address'     => ['nullable', 'string'],
            'is_active'   => ['boolean'],
        ];
    }
}
