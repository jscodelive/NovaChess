<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('stock', 10, 2)->unsigned()->default(0)->change();
            $table->decimal('cost_usd', 15, 2)->unsigned()->default(0)->change();
        });

        Schema::table('milk_receptions', function (Blueprint $table) {
            $table->decimal('volume_liters', 10, 2)->unsigned()->change();
            $table->decimal('acidity', 5, 2)->unsigned()->nullable()->change();
            $table->decimal('price_per_liter_usd', 15, 2)->unsigned()->change();
        });

        Schema::table('production_batches', function (Blueprint $table) {
            $table->decimal('volume_milk_used', 10, 2)->unsigned()->change();
            $table->decimal('yield_kg', 10, 2)->unsigned()->change();
        });

        Schema::table('batch_inputs', function (Blueprint $table) {
            $table->decimal('quantity', 10, 2)->unsigned()->change();
        });

        Schema::table('sales', function (Blueprint $table) {
            $table->decimal('quantity_kg', 10, 2)->unsigned()->change();
            $table->decimal('price_usd', 15, 2)->unsigned()->change();
            $table->decimal('total_usd', 15, 2)->unsigned()->change();
        });

        Schema::table('accounts_receivables', function (Blueprint $table) {
            $table->decimal('original_amount_usd', 15, 2)->unsigned()->change();
            $table->decimal('balance_usd', 15, 2)->unsigned()->change();
        });

        Schema::table('exchange_rates', function (Blueprint $table) {
            $table->decimal('rate_bcv', 15, 6)->unsigned()->change();
            $table->decimal('rate_parallel', 15, 6)->unsigned()->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('stock', 10, 2)->default(0)->change();
            $table->decimal('cost_usd', 15, 2)->default(0)->change();
        });

        Schema::table('milk_receptions', function (Blueprint $table) {
            $table->decimal('volume_liters', 10, 2)->change();
            $table->decimal('acidity', 5, 2)->nullable()->change();
            $table->decimal('price_per_liter_usd', 15, 2)->change();
        });

        Schema::table('production_batches', function (Blueprint $table) {
            $table->decimal('volume_milk_used', 10, 2)->change();
            $table->decimal('yield_kg', 10, 2)->change();
        });

        Schema::table('batch_inputs', function (Blueprint $table) {
            $table->decimal('quantity', 10, 2)->change();
        });

        Schema::table('sales', function (Blueprint $table) {
            $table->decimal('quantity_kg', 10, 2)->change();
            $table->decimal('price_usd', 15, 2)->change();
            $table->decimal('total_usd', 15, 2)->change();
        });

        Schema::table('accounts_receivables', function (Blueprint $table) {
            $table->decimal('original_amount_usd', 15, 2)->change();
            $table->decimal('balance_usd', 15, 2)->change();
        });

        Schema::table('exchange_rates', function (Blueprint $table) {
            $table->decimal('rate_bcv', 15, 6)->change();
            $table->decimal('rate_parallel', 15, 6)->nullable()->change();
        });
    }
};
