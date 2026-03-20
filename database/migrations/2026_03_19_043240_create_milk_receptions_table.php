<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('milk_receptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_id')->constrained()->cascadeOnDelete();
            $table->date('reception_date')->index();
            $table->decimal('volume_liters', 10, 2);
            $table->decimal('acidity', 5, 2)->nullable();
            $table->decimal('temperature', 5, 2)->nullable();
            $table->decimal('price_per_liter_usd', 15, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('milk_receptions');
    }
};
