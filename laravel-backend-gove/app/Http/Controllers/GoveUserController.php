<?php

namespace App\Http\Controllers;

use App\Models\GoveUser;
use Illuminate\Http\Request;

class GoveUserController extends Controller
{

    public function index()
    {
        // SoftDeletes já são filtrados automaticamente!
        $usuarios = GoveUser::all();
        return response()->json($usuarios);
    }

    public function createUser(Request $request)
    {

        $request->merge([
            'permissionOne' => $request->input('permissionOne', false),
            'permissionTwo' => $request->input('permissionTwo', false),
        ]);

        $incomingFields = $request->validate([
            "name" => "required",
            "email" => "required",
            "phone" => "required",
            "userType" => "required",
            "secretary" => "required",
            "permissionOne" => "required|boolean",
            "permissionTwo" => "required|boolean",
        ]);

        $incomingFields['permissionOne'] = filter_var($incomingFields['permissionOne'], FILTER_VALIDATE_BOOLEAN);
        $incomingFields['permissionTwo'] = filter_var($incomingFields['permissionTwo'], FILTER_VALIDATE_BOOLEAN);


        GoveUser::create($incomingFields);
        return response()->json(['message' => 'Criado com sucesso!'], 201);
    }

    public function editUser(Request $request, GoveUser $usuario)
    {
        $incomingFields = $request->validate([
            "name" => "required",
            "email" => "required",
            "phone" => "required",
            "userType" => "required",
            "secretary" => "required",
            "permissionOne" => "required|boolean",
            "permissionTwo" => "required|boolean",
        ]);

        $incomingFields['permissionOne'] = filter_var($incomingFields['permissionOne'], FILTER_VALIDATE_BOOLEAN);
        $incomingFields['permissionTwo'] = filter_var($incomingFields['permissionTwo'], FILTER_VALIDATE_BOOLEAN);

        $usuario->update($incomingFields);
        return response()->json(['message' => 'Atualizado com sucesso!'], 200);
    }

    public function deleteUser(GoveUser $usuario)
    {
        $usuario->delete();
        return response()->json(['message' => 'Deletado com sucesso!'], 200);
    }
}
