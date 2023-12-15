<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use SebastianBergmann\CodeCoverage\Driver\Driver;

class CarRide extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'driver_id', 'from_long', 'from_lat', 'to_long', 'to_lat', 'price', 'rate', 'duration', 'status'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }
}
