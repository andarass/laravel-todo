<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\TaskController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/tasks', [TaskController::class, 'index']);
Route::post('/api/tasks', [TaskController::class, 'store']);
Route::put('/api/tasks/{task}', [TaskController::class, 'update']);
Route::delete('/api/tasks/{task}', [TaskController::class, 'destroy']);

Route::apiResource('tasks', TaskController::class);