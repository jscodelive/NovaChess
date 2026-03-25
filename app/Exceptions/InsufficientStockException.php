<?php

namespace App\Exceptions;

use Exception;

class InsufficientStockException extends Exception
{
    public function __construct(string $productName = '')
    {
        $message = $productName
            ? "Stock insuficiente para el producto: {$productName}."
            : "Stock insuficiente para el producto seleccionado.";

        parent::__construct($message, 422);
    }
}
