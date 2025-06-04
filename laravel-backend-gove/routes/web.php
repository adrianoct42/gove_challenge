<?php

use App\Models\GoveUser;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/usuarios');

Route::get('/usuarios', function () {
    $usuarios = GoveUser::all();
    return view('welcome', ["usuarios" => $usuarios]);
});
