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
        Schema::create('driver_register_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->integer('phone_number');
            $table->enum('location', ['beirut', 'tripoli', 'batroun', 'sayda', 'chouf', 'south']);
            $table->string('img_url');
            $table->string('car_name');
            $table->integer('model');
            $table->string('color');
            $table->string('plate_number');
            $table->enum('request_status', ['pending', 'accepted']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('driver_register_requests');
    }
};
