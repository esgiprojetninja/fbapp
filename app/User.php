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
        'name', 'email', 'fb_id', 'token'
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
        $fb = new Facebook();

        $isAdmin = $fb->getAppRoles();
        $isAdmin = $isAdmin->getDecodedBody();

        $idUser = $this->fb_id;

        foreach ($isAdmin['data'] as $user) {
            if($user['user'] == $idUser && $user['role'] == 'administrators'){
                return true;
            }
        }
        return false;
    }

}
