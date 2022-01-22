<?php

namespace App\Policies;

use App\Models\Role;
use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TaskPolicy
{
    use HandlesAuthorization;

    /**
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function createTask(User $user)
    {
        return $user->role_id == Role::ADMINISTRATOR || $user->role_id == Role::SUPER_ADMINISTRATOR;
    }

    /**
     * @param  \App\Models\User  $user
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function updateTask(User $user, Task $task)
    {
        return $user->role_id == Role::ADMINISTRATOR ||
            $user->role_id == Role::SUPER_ADMINISTRATOR ||
            (auth()->check() && auth()->id() == $task->user_id);
    }

    /**
     * @param  \App\Models\User  $user
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function deleteTask(User $user, Task $task)
    {
        return $user->role_id == Role::ADMINISTRATOR || $user->role_id == Role::SUPER_ADMINISTRATOR;
    }
}
