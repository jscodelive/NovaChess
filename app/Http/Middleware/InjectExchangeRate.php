<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\ExchangeRate;
use Illuminate\Support\Facades\Cache;

class InjectExchangeRate
{
    /**
     * Handle an incoming request.
     * Injects the current day's exchange rate into the request or config context.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // For high availability, we cache the exchange rate for 1 hour
        $rates = Cache::remember('current_exchange_rate', 3600, function () {
            return ExchangeRate::orderBy('date', 'desc')->first();
        });

        if ($rates) {
            // We can inject it into the config or directly into the request attributes
            config(['app.exchange_rate_bcv' => $rates->rate_bcv]);
            config(['app.exchange_rate_parallel' => $rates->rate_parallel]);
            
            $request->attributes->add([
                'current_rate_bcv' => $rates->rate_bcv,
                'current_rate_parallel' => $rates->rate_parallel,
            ]);
        }

        return $next($request);
    }
}
