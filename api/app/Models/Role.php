<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    public const SUPER_ADMINISTRATOR = 1;
    public const ADMINISTRATOR = 2;
    public const USER = 3;

    public static function Type($id)
    {
        return match ($id) {
            self::SUPER_ADMINISTRATOR => 'Super Admin',
            self::ADMINISTRATOR => 'Admin',
            self::USER => 'User',
        };
    }
}
