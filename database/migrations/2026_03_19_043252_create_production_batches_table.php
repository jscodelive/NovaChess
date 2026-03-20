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
        Schema::create('production_batches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->comment('Queso producido');
            $table->date('production_date')->index();
            $table->decimal('volume_milk_used', 10, 2)->comment('Litros de leche');
            $table->decimal('yield_kg', 10, 2)->comment('Kg de queso producido');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('production_batches');
    }
};
