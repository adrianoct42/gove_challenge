<?php

use App\Http\Controllers\GoveUserController;
use Illuminate\Support\Facades\Route;

/* 
O Laravel faz uma pequena "mágica" aqui, chamada de "route model binding".
Essencialmente o {usuario} nos exemplos abaixo das URLs de put e delete,
são os IDs que você passaria para essa rota.
Note no entanto, que no controller, se você coloca EXATAMENTE O MESMO NOME
NO PARÂMETRO (nesse caso, um GoveUser $usuario), ele faz essa pequena mágica...
E ali, usuário foi feito um "find" por baixo dos panos, e ele representa de fato
o elemento total, não somente o id! :)
*/

Route::get('/usuarios', [GoveUserController::class, 'index']);
Route::post("/cadastrar-usuario", [GoveUserController::class, "createUser"]);
Route::put("/editar-usuario/{usuario}", [GoveUserController::class, "editUser"]);
Route::delete("/deletar-usuario/{usuario}", [GoveUserController::class, "deleteUser"]);
