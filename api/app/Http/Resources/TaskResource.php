<?php

namespace App\Http\Resources;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'due_date' => Carbon::parse($this->due_date)->format('Y-m-d H:i:s'),
            'priority' => $this->priority,
            'in_charge' => new UserResource(User::findOrFail($this->user_id))
        ];
    }
}
