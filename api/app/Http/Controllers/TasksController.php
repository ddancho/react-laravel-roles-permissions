<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;

class TasksController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TaskResource::collection(Task::with(['user'])->paginate(10));
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function isAuthorizedToStore()
    {
        $this->authorize('createTask', Task::class);

        return response(status: 204);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('createTask', Task::class);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function info(Request $request, Task $task)
    {
        $this->authorize('updateTask', $task);

        return response()->json([
            'task' => new TaskResource($task)
        ]);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function isAuthorizedToUpdate(Request $request, Task $task)
    {
        $this->authorize('updateTask', $task);

        return response(status: 204);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        $this->authorize('updateTask', $task);

        $this->validate($request, [
            'status' => 'required|numeric|min:0|max:1'
        ]);

        $task->update([
            'status' => $request->status
        ]);

        return response(status: 200);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function isAuthorizedToDestroy(Request $request, Task $task)
    {
        $this->authorize('deleteTask', $task);

        return response(status: 204);
    }

    /**
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        $this->authorize('deleteTask', $task);
    }
}
