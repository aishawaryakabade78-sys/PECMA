<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;


// Public routes

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);


// Protected routes

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', [AuthController::class, 'user']);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/admin/categories', [
        CategoryController::class,
        'index'
    ]);

    Route::post('/admin/categories', [
        CategoryController::class,
        'store'
    ]);

    Route::get('/admin/categories/{category}', [
        CategoryController::class,
        'show'
    ]);

    Route::put('/admin/categories/{category}', [
        CategoryController::class,
        'update'
    ]);

    Route::delete('/admin/categories/{category}', [
        CategoryController::class,
        'destroy'
    ]);

});