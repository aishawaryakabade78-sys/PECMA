<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


// Public routes

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);


// Protected routes

Route::middleware('auth:sanctum')->group(function () {

   Route::get('/user', function () {
    return response()->json([
        'success' => true,
        'message' => 'User API working successfully'
    ]);
});

    Route::post('/logout', [AuthController::class, 'logout']);

});