<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function get_user()
    {
        $user = Auth::user();
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

    public function edit_driver(Request $request)
    {
        $this->authorize('admin');
        $user = Auth::user();
        // cant use $user->save() or any otger method unless I do this
        $user = User::find($user->id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
            'phone_number' => 'required|integer|min:3',
            'location' => 'required|string',
            'model' => 'required|integer',
            'color' => 'required|string',
            'plate_number' => 'required|string',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->phone_number = $request->phone_number;
        $user->location = $request->location;
        $user->img_url =  'uploads/default.jpg';

        $user->save();

        $user->driver->car->color = $request->color;
        $user->driver->car->model = $request->model;
        $user->driver->car->plate_number = $request->plate_number;

        $user->driver->car->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Profile Edited Successfuly',
            'user' => $user
        ]);
    }
    public function edit_passenger(Request $request)
    {
        $this->authorize('passenger');
        $user = Auth::user();
        // cant use $user->save() or any otger method unless I do this
        $user = User::find($user->id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
            'phone_number' => 'required|integer|min:3',
            'location' => 'required|string',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->phone_number = $request->phone_number;
        $user->location = $request->location;
        $user->img_url = 'uploads/default.jpg';

        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Profile Edited Successfuly',
            'user' => $user
        ]);
    }

    public function upload_pic(Request $request)
    {
        $request->validate([
            'picture' => 'image|mimes:jpeg,png,jpg,gif,webp', // Adjust validation rules as needed
        ]);

        $picturePath = $request->file('picture')->store('uploads', 'public');

        $user = Auth::user();
        $user = User::find($user->id);
        $user->img_url = $picturePath;
        $user->save();

        return response()->json(['message' => 'Picture uploaded successfully', 'picture_path' => $picturePath]);
    }
    public function getDriverId(Request $request)
    {
        $user_id = Driver::find($request->driver_id)->user_id;
        $user = User::find($user_id);
        return response()->json([
            'user' => $user
        ]);
    }
}
