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
        $fb = new \Facebook\Facebook([
            'app_id' => '1200139990052440',
            'app_secret' => '7ed0f55fd08612a805b851fa6fbde893',
            'default_graph_version' => 'v2.8',
        ]);

        $isAdmin = $fb->get('/app/roles', "1200139990052440|sIs-ANSRKPtTyImEdl68B8P56ZI");
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
