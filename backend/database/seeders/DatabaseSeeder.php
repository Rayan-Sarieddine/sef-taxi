<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Car;
use App\Models\CarRide;
use App\Models\Driver;
use App\Models\DriverRegisterRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        Role::create([
            "name" => 'admin',
        ]);
        Role::create([
            "name" => 'passenger',
        ]);
        Role::create([
            "name" => 'driver',
        ]);

        User::factory()->create([
            'name' => 'Admin',
            'role_id' => 1,
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'location' => 'beirut',
            'img_url' => 'upload/default.jpg',
            'phone_number' => 12355,

        ]);
        User::factory()->create([
            'name' => 'Driver 1',
            'role_id' => 3,
            'email' => 'driver1@example.com',
            'password' => Hash::make('password'),
            'location' => 'beirut',
            'img_url' => 'upload/default.jpg',
            'phone_number' => 12355,

        ]);
        User::factory()->create([
            'name' => 'Driver 2',
            'role_id' => 3,
            'email' => 'driver2@example.com',
            'password' => Hash::make('password'),
            'location' => 'beirut',
            'img_url' => 'upload/default.jpg',
            'phone_number' => 12355,

        ]);
        User::factory()->create([
            'name' => 'Passenger 1',
            'role_id' => 2,
            'email' => 'passenger1@example.com',
            'password' => Hash::make('password'),
            'location' => 'beirut',
            'img_url' => 'upload/default.jpg',
            'phone_number' => 12355,

        ]);
        User::factory()->create([
            'name' => 'Passenger 2',
            'role_id' => 2,
            'email' => 'passenger2@example.com',
            'password' => Hash::make('password'),
            'location' => 'beirut',
            'img_url' => 'upload/default.jpg',
            'phone_number' => 12355,
        ]);
        User::factory()->create([
            'name' => 'Passenger 3',
            'role_id' => 2,
            'email' => 'passenger3@example.com',
            'password' => Hash::make('password'),
            'location' => 'beirut',
            'img_url' => 'upload/default.jpg',
            'phone_number' => 12355,
        ]);
        User::factory()->create([
            'name' => 'Passenger 4',
            'role_id' => 2,
            'email' => 'passenger4@example.com',
            'password' => Hash::make('password'),
            'location' => 'beirut',

            'img_url' => 'upload/default.jpg',

            'phone_number' => 12355,
        ]);
        Driver::create([
            'user_id' => 2,
            'availability' => 'active'
        ]);
        Driver::create([
            'user_id' => 3,
            'availability' => 'active'
        ]);
        // Driver::create([
        //     'user_id' => 8,
        //     'availability' => 'active'
        // ]);
        Car::create([
            'driver_id' => 1,
            'name' => 'some car bro',
            'model' => 2018,
            'color' => 'red',
            'plate_number' => 'yolomolo'
        ]);
        Car::create([
            'driver_id' => 2,
            'name' =>
            'some white car bro',
            'model' => 2009,
            'color' => 'white',
            'plate_number' => 'Nadim'
        ]);
        DriverRegisterRequest::create([
            'name' => 'Ali',
            'email' => 'ali@example.com',
            'password' => 'password',
            'phone_number' => 71000000,
            'location' => 'beirut',

            'img_url' => 'uploads/default.jpg',
            'car_name' => 'tyoyota',
            'model' => 15,

            'color' => 'color',
            'plate_number' => 'plate_number',
            'request_status' => 'pending',
        ]);
        DriverRegisterRequest::create([
            'name' => 'Rayan',
            'email' => 'rayan@example.com',
            'password' => 'password',
            'phone_number' => 71000000,
            'location' => 'beirut',
            'img_url' => 'uploads/default.jpg',
            'car_name' =>
            'tyoyota',
            'model' => 15,

            'color' => 'color',
            'plate_number' => 'plate_number',
            'request_status' => 'accepted',
        ]);
        DriverRegisterRequest::create([
            'name' => 'nadim',
            'email' => 'nadim@example.com',
            'password' => 'password',
            'phone_number' => 71000000,
            'location' => 'beirut',

            'img_url' => 'uploads/default.jpg',
            'car_name' =>
            'tyoyota',
            'model' => 15,

            'color' => 'color',
            'plate_number' => 'plate_number',
            'request_status' => 'pending',
        ]);
        CarRide::create([
            'user_id' => 4,
            'driver_id' => 2,
            'from_long' => '12345.22',
            'from_lat' => '12345.22',
            'to_long' => '12345.22',
            'to_lat' => '12345.22',
            'price' => 15,
            'rate' => 4.5,
            'duration' => 5,
            'status' => 'pending',
        ]);
        CarRide::create([
            'user_id' => 4,
            'driver_id' => 2,
            'from_long' => '12345.22',
            'from_lat' => '12345.22',
            'to_long' => '12345.22',
            'to_lat' => '12345.22',
            'price' => 15,
            'rate' => 4.5,
            'duration' => 5,
            'status' => 'pending',
        ]);

        CarRide::create([
            'user_id' => 4,
            'driver_id' => 2,
            'from_long' => '12345.22',
            'from_lat' => '12345.22',
            'to_long' => '12345.22',
            'to_lat' => '12345.22',
            'price' => 15,
            'rate' => 4.5,
            'duration' => 5,
            'status' => 'pending',
        ]);
    }
}
