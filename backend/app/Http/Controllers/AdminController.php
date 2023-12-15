<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Driver as ModelsDriver;
use App\Models\Driver;
use App\Models\DriverRegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function getDriverRegisterRequests()
    {
        $this->authorize('admin');
        $requests = DriverRegisterRequest::where('request_status', 'pending')->get();
        return response()->json([
            'status' => 'success',
            'register_requests' => $requests,
        ], 200);
    }

    public function getAllDrivers()
    {
        $this->authorize('admin');
        $passengers = User::where('role_id', 3)->get();
        foreach ($passengers as $passenger) {
            // $car = $passenger->car;
            $user = $passenger->driver->car;
        }

        return response()->json([
            'status' => 'success',
            'drivers' => $passengers,
        ], 200);
    }
    public function getAllPassengers()
    {
        $this->authorize('admin');
        $passenger = User::where('role_id', 2)->get();
        return response()->json([
            'status' => 'success',
            'passengers' => $passenger,
        ], 200);
    }
    public function approve(Request $request)
    {
        $this->authorize('admin');
        $passenger_request = DriverRegisterRequest::where('id', $request->id)->first();

        if ($passenger_request->request_status == 'accepted') {
            return response()->json(['error' => "This driver has already been accepted"], 406);
        }
        $passenger_request->request_status = 'accepted';
        $passenger_request->save();

        $user = new User();
        $user->name = $passenger_request->name;
        $user->email = $passenger_request->email;
        $user->phone_number = $passenger_request->phone_number;
        $user->password = Hash::make($passenger_request->password);
        $user->location = $passenger_request->location;
        $user->img_url = 'upload/default.png';
        $user->role_id = 3;
        $user->save();

        $passenger = new Driver();
        $passenger->user_id = $user->id;
        $passenger->availability = 'active';
        $passenger->save();

        $car = new Car();

        $car->name = $driver_request->name;
        $car->model = $driver_request->model;
        $car->color = $driver_request->color;
        $car->plate_number = $driver_request->plate_number;
        $car->driver_id = $driver->id;

        $car->save();

        return response()->json([
            'status' => 'success',
            'user' => $user,
        ]);
    }

    public function get_user(Request $request)
    {
        $user = User::find($request->id);

        if ($user->role->name == 'driver') {
            return response()->json([
                'status' => 'success',
                'user' => $user,
                'car' => $user->driver->car
            ]);
        }
        return response()->json([
            'status' => 'success',
            'user' => $user,
        ]);
    }
    public function deny(Request $request)
    {
        $this->authorize('admin');
        $passenger_request = DriverRegisterRequest::where('id', $request->id)->first();

        if (!$passenger_request) {
            return response()->json(['error' => "Driver registration request not found"], 404);
        }

        if ($passenger_request->request_status == 'accepted') {
            return response()->json(['error' => "This driver has already been accepted"], 406);
        }

        $passenger_request->delete();
        return response()->json(['status' => 'success', 'message' => 'Driver request denied'], 200);
    }
    public function edit_driver(Request $request)
    {

        $user = User::find($request->id);

        $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
            'name' => 'required|string|max:255',
            'model' => 'required|integer',
        ]);

        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->name = $request->name;
        $user->save();

        $user->driver->car->model = $request->model;
        $user->driver->car->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Profile Edited Successfuly',
            'user' => $user
        ]);
    }

    public function edit_user(Request $request)
    {

        $user = User::find($request->id);

        $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
            'name' => 'required|string|max:255',
        ]);

        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->name = $request->name;
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Profile Edited Successfuly',
            'user' => $user
        ]);
    }

    public function delete_user(Request $request)
    {
        $user = User::find($request->id);

        if ($user) {
            $user->delete();
            return response()->json([
                'message' => 'User deleted successfully',
                'status' => 'success',
            ], 200);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function get_user_orders(Request $request)
    {
        $passenger = Driver::where('user_id', $request->id)->first();
        if ($passenger) {
            $userOrders = $passenger->car_rides;
            return response()->json(['orders' => $userOrders], 200);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function driver_analytics(Request $request)
    {
        $passenger = Driver::where('user_id', $request->id)->first();

        $distinctDaysCount = $passenger->car_rides()
            ->selectRaw('COUNT(DISTINCT DATE(created_at)) as count')
            ->value('count');

        $distinctMonthsCount = $passenger->car_rides()
            ->selectRaw('COUNT(DISTINCT YEAR(created_at), MONTH(created_at)) as count')
            ->value('count');

        $totalOrders = $passenger->car_rides()->count();
        $averageOrdersPerDay = $totalOrders / $distinctDaysCount;
        $averageOrdersPerMonth = $totalOrders / $distinctMonthsCount;
        $canceledOrders = $passenger->car_rides()->where('status', 'canceled')->count();
        $totalProfit = $passenger->car_rides()->sum('price');
        $averageProfitPerDay = $totalProfit / $passenger->car_rides()->selectRaw('COUNT(DISTINCT DATE(created_at))')->count();
        $averageProfitPerMonth = $totalProfit / $passenger->car_rides()->selectRaw('COUNT(DISTINCT YEAR(created_at), MONTH(created_at))')->count();
        $averageRating = $passenger->car_rides()->avg('rate');
        $averageTripTime = $passenger->car_rides()->avg('duration');

        return response()->json([
            'total_orders' => $totalOrders,
            'canceled_orders' => $canceledOrders,
            'average_orders_per_day' => $averageOrdersPerDay,
            'average_orders_per_month' => $averageOrdersPerMonth,
            'total_profit' => $totalProfit,
            'average_profit_per_day' => $averageProfitPerDay,
            'average_profit_per_month' => $averageProfitPerMonth,
            'average_rating' => $averageRating,
            'average_trip_time' => $averageTripTime,
        ], 200);
    }

    public function passenger_analytics(Request $request)
    {
        $passenger = User::where('id', $request->id)->first();
        $distinctDaysCount = $passenger->car_rides()
            ->selectRaw('COUNT(DISTINCT DATE(created_at)) as count')
            ->value('count');
        $distinctMonthsCount = $passenger->car_rides()
            ->selectRaw('COUNT(DISTINCT YEAR(created_at), MONTH(created_at)) as count')
            ->value('count');
        if ($distinctMonthsCount == 0) {
            $distinctMonthsCount = 1;
        }
        if ($distinctDaysCount == 0) {
            $distinctDaysCount = 1;
        }
        $totalOrders = $passenger->car_rides()->count();
        $averageOrdersPerDay = $totalOrders / $distinctDaysCount;
        $averageOrdersPerMonth = $totalOrders / $distinctMonthsCount;
        $canceledOrders = $passenger->car_rides()->where('status', 'canceled')->count();

        return response()->json([
            'total_orders' => $totalOrders,
            'canceled_orders' => $canceledOrders,
            'average_orders_per_day' => $averageOrdersPerDay,
            'average_orders_per_month' => $averageOrdersPerMonth,

        ], 200);
    }
}
