<?php

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TasksController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/tasks', [TasksController::class, 'index']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', fn (Request $request) => new UserResource($request->user()));

    Route::get('/tasks/isAuthorized/toStore', [TasksController::class, 'isAuthorizedToStore']);
    Route::get('/tasks/isAuthorized/toUpdate', [TasksController::class, 'isAuthorizedToUpdate']);
    Route::get('/tasks/isAuthorized/toDestroy', [TasksController::class, 'isAuthorizedToDestroy']);

    // to do -> change to post
    Route::get('/tasks/create', [TasksController::class, 'store']);
});
