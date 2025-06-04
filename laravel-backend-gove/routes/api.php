<?php

use App\Http\Controllers\GoveUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/* Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum'); */

Route::get('/usuarios', [GoveUserController::class, 'index']);
Route::post("/cadastrar-usuario", [GoveUserController::class, "createUser"]);
Route::put("/editar-usuario/{usuario}", [GoveUserController::class, "editUser"]);
Route::delete("/delete-usuario/{usuario}", [GoveUserController::class, "deleteUser"]);
