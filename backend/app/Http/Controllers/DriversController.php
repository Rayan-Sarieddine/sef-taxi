<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DriversController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getAvailableDrivers(Request $request)
    {
        $this->authorize('passenger');


        $request->validate([
            'current_lat' => 'required',
            'current_long' => 'required',
            'dest_lat' => 'required',
            'dest_long' => 'required',
            'pickup_location' => 'required',
        ]);

        $pickup_location = $request->pickup_location;
        $current_lat = $request->current_lat;
        $current_long = $request->current_long;
        $dest_lat = $request->dest_lat;
        $des_long = $request->des_long;

        function calculateDistance($lat1, $lon1, $lat2, $lon2)
        {
            $earthRadius = 6371; // Earth's radius in kilometers

            $dLat = deg2rad($lat2 - $lat1);
            $dLon = deg2rad($lon2 - $lon1);

            $a = sin($dLat / 2) * sin($dLat / 2) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon / 2) * sin($dLon / 2);
            $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

            $distance = $earthRadius * $c; // Distance in kilometers

            return $distance;
        }
        $distance = (calculateDistance($current_lat, $current_long, $dest_lat, $des_long)) / 1000;

        $availableDrivers = Driver::where('availability', 'active')->get();
        $locationDrivers = [];
        foreach ($availableDrivers as $d1) {
            if ($d1->user->location === $pickup_location) {
                $locationDrivers[] = $d1;
            }
        }
        $driversData = [];
        // return response()->json(['available_drivers' => $availableDrivers]);

        // $driver = $locationDrivers[0];
        foreach ($locationDrivers as $driver) {
            $driverId = $driver->id;
            $driverName = $driver->user->name;
            $carName = $driver->car->name;
            $carModel = $driver->car->model;
            $carColor = $driver->car->color;
            $driverImg = $driver->user->img_url;
            $eta = intval(($distance / 60) * 100);
            $iprice = 1 + ($distance * 1.1 - (0.2 * (2024 - $carModel)));
            $price = number_format($iprice, 2);
            $driversData[] = [
                'driver_id' => $driverId,
                'driver_name' => $driverName,
                'car_name' => $carName,
                'car_model' => $carModel,
                'car_color' => $carColor,
                'eta' => $eta,
                'price' => $price,
                'distance' => $distance,
                'driver_img' => $driverImg,
            ];
        }
        return response()->json(['available_drivers' => $driversData]);
    }
}
