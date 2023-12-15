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
        Schema::create('car_rides', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('driver_id')->constrained()->onDelete('cascade');
            $table->integer('from_long');
            $table->integer('from_lat');
            $table->integer('to_long');
            $table->integer('to_lat');
            $table->string('price');
            $table->integer('rate')->nullable();
            $table->integer('duration');
            $table->enum('status', ['pending', 'accepted', 'finished', 'denied']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_rides');
    }
};
