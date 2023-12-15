<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Driver extends Model
{
    use HasFactory;

    public function car(): HasOne
    {
        return $this->hasOne(Car::class);
    }

    public function car_rides(): HasMany
    {
        return $this->hasMany(CarRide::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
