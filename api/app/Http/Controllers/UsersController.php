<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UsersController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    public function autocompleteSearch(Request $request)
    {
        $this->authorize('searchAny', User::class);

        $this->validate(
            $request,
            [
                'search' => 'required|string'
            ]
        );

        $search = Str::lower($request->search);

        $searchResult = UserResource::collection(
            User::where('name', 'LIKE', '%' . $search . '%')
                ->whereNotIn('role_id', [Role::SUPER_ADMINISTRATOR, Role::ADMINISTRATOR])
                ->get()
        );

        return response()->json($searchResult);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function isAuthorizedToAccessAdminPage(Request $request)
    {
        $this->authorize('accessAdminPage', $request->user());

        return response(status: 204);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function isAuthorizedToUpdateRoleToAdmin(Request $request)
    {
        $this->authorize('updateRoleToAdmin', $request->user());

        return response(status: 204);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updateUserRole(Request $request, User $user)
    {
        $this->authorize('updateRoleToAdmin', $request->user());

        $this->validate($request, [
            'userId' => 'required|numeric',
        ]);

        $user->update([
            'role_id' => Role::ADMINISTRATOR
        ]);

        return response(status: 200);
    }
}
