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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name')->index();
            $table->date('sale_date')->index();
            $table->foreignId('product_id')->constrained()->comment('Queso vendido');
            $table->decimal('quantity_kg', 10, 2);
            $table->decimal('price_usd', 15, 2);
            $table->decimal('total_usd', 15, 2);
            $table->enum('status', ['paid', 'credit'])->default('paid');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
