<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;

use Socialite;

class AuthController extends Controller
{
    public function getMe()
    {
        $user = Auth::user();
        return response()->json([
            'user' => $user
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'logged_out' => true
        ]);
    }

    public static function isAdmin()
    {
        $fb =  new \App\Facebook();

        $isAdmin = $fb->get();
        $isAdmin = $isAdmin->getDecodedBody();

        $user = Auth::user();
        $idUser = $user->getAttributes()['fb_id'];

        foreach ($isAdmin['data'] as $user) {
            if($user['user'] == $idUser && $user['role'] == 'administrators'){
                return response()->json([
                    'admin' => TRUE
                ]);
            }
        }
        return response()->json([
            'admin' => FALSE
        ]);
    }

}
