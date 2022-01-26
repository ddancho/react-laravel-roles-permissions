<?php

namespace App\Policies;

use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function searchAny(User $user)
    {
        return $user->role_id == Role::ADMINISTRATOR || $user->role_id == Role::SUPER_ADMINISTRATOR;
    }
}
