<?php

namespace App\Http\Controllers;

use App\Models\GoveUser;
use Illuminate\Http\Request;

class GoveUserController extends Controller
{

    public function index()
    {
        return response()->json(GoveUser::all());
    }

    public function createUser(Request $request)
    {
        $incomingFields = $request->validate([
            "name" => "required",
            "email" => "required",
            "phone" => "required",
            "userType" => "required",
            "secretary" => "required",
            "permissionOne" => "required",
            "permissionTwo" => "required",
        ]);

        GoveUser::create($incomingFields);
        return redirect("/usuarios");
    }

    public function editUser(Request $request, GoveUser $usuario)
    {
        $incomingFields = $request->validate([
            "name" => "required",
            "email" => "required",
            "phone" => "required",
            "userType" => "required",
            "secretary" => "required",
            "permissionOne" => "required",
            "permissionTwo" => "required",
        ]);

        $usuario->update($incomingFields);
        return redirect("/usuarios");
    }

    public function deleteUser(GoveUser $usuario)
    {
        $usuario->delete();
        return redirect("/usuarios");
    }
}
