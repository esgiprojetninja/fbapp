<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'fb_id', 'is_admin', 'token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'remember_token'
    ];

    public function setFbId($fb_id) {
        $this->fb_id = $fb_id;
    }

    public function setToken($token) {
        $this->token = $token;
    }

    public function isAdmin() {
        return $this->is_admin;
    }
}
