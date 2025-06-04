<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GoveUser extends Model
{
    protected $fillable = [
        'name',
        'email',
        "phone",
        "userType",
        "secretary",
        "permissionOne",
        "permissionTwo"
    ];

    protected $casts = [
        'permissionOne' => 'boolean',
        'permissionTwo' => 'boolean',
    ];
}
