<?php

namespace Tests\Unit;

test('it calculates yield correctly based on milk liters and cheese kg', function () {
    // Rendimiento: Litros de leche necesarios para hacer 1 Kg de queso
    $volumeMilkUsed = 100; // 100 litros de leche
    $cheeseProducedKg = 12.5; // 12.5 kg de queso
    
    // Fórmula de rendimiento: Litros de Leche / Kg de Queso
    $yield = $volumeMilkUsed / $cheeseProducedKg;
    
    // Esperamos que el rendimiento sea de 8 litros por Kg de queso
    expect($yield)->toBe(8.0);
});

test('it calculates cheese percentage from milk volume', function () {
    $volumeMilkUsed = 100; 
    $cheeseProducedKg = 12.5; 
    
    // Porcentaje de queso obtenido
    $percentage = ($cheeseProducedKg / $volumeMilkUsed) * 100;
    
    expect($percentage)->toBe(12.5);
});
