<?php

namespace App\Console\Commands;

use App\Models\ExchangeRate;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FetchBcvRate extends Command
{
    protected $signature = 'bcv:fetch';
    protected $description = 'Obtiene la tasa de cambio oficial del BCV (Banco Central de Venezuela)';

    public function handle(): int
    {
        $this->info('Consultando tasa del BCV…');

        try {
            $response = Http::withoutVerifying()
                ->timeout(15)
                ->get('https://www.bcv.org.ve/');

            if (!$response->ok()) {
                $this->error("Error HTTP: {$response->status()}");
                return self::FAILURE;
            }

            $html = $response->body();

            // Extraer tasa USD: buscar dentro de #dolar .centrado strong
            $usdRate = $this->extractRate($html, 'dolar');
            $eurRate = $this->extractRate($html, 'euro');
            $date = $this->extractDate($html);

            if (!$usdRate) {
                $this->error('No se pudo extraer la tasa USD del HTML.');
                Log::warning('BCV scraper: no se encontró la tasa USD');
                return self::FAILURE;
            }

            $rateDate = $date ?? now()->toDateString();

            // Crear o actualizar la tasa del día
            $exchangeRate = ExchangeRate::updateOrCreate(
                ['date' => $rateDate],
                [
                    'rate_bcv'      => $usdRate,
                    'rate_parallel' => $eurRate, // Guardamos EUR como referencia adicional
                ]
            );

            // Limpiar caché
            Cache::forget('current_exchange_rate');

            $this->info("Tasa BCV USD: Bs. {$usdRate}");
            if ($eurRate) {
                $this->info("Tasa BCV EUR: Bs. {$eurRate}");
            }
            $this->info("Fecha: {$rateDate}");
            $this->info('Tasa guardada correctamente.');

            return self::SUCCESS;
        } catch (\Exception $e) {
            $this->error("Error: {$e->getMessage()}");
            Log::error('BCV scraper error: ' . $e->getMessage());
            return self::FAILURE;
        }
    }

    /**
     * Extrae la tasa de una moneda del HTML del BCV.
     * Busca el patrón: <div id="$currency">...<strong> VALUE </strong>
     */
    private function extractRate(string $html, string $currency): ?float
    {
        // Patrón: <div id="dolar" ...> ... <strong> 462,66870000 </strong>
        $pattern = '/<div\s+id="' . preg_quote($currency, '/') . '"[^>]*>.*?<strong>\s*([\d.,]+)\s*<\/strong>/si';

        if (preg_match($pattern, $html, $matches)) {
            // Convertir formato venezolano (462,66870000) a float (462.66870000)
            $value = str_replace('.', '', $matches[1]); // Quitar separador de miles
            $value = str_replace(',', '.', $value);     // Coma → punto decimal
            return (float) $value;
        }

        return null;
    }

    /**
     * Extrae la fecha de la tasa del HTML del BCV.
     * Busca: <span class="date-display-single" ... content="2026-03-25T00:00:00-04:00">
     */
    private function extractDate(string $html): ?string
    {
        if (preg_match('/class="date-display-single"[^>]*content="(\d{4}-\d{2}-\d{2})T/i', $html, $matches)) {
            return $matches[1];
        }

        return null;
    }
}
