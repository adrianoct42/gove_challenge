<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GoveUser extends Model
{
    use SoftDeletes;

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
