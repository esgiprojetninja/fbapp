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
        $user = Auth::user();
        if ( $user !== null && !empty($user) ) {
            $fb = new \Facebook\Facebook([
                'app_id' => '1200139990052440',
                'app_secret' => '7ed0f55fd08612a805b851fa6fbde893',
                'default_graph_version' => 'v2.8',
            ]);
            $isAdmin = $fb->get('/app/roles', "1200139990052440|sIs-ANSRKPtTyImEdl68B8P56ZI");
            $isAdmin = $isAdmin->getDecodedBody();            
            $idUser = $user->getAttributes()['fb_id'];
            foreach ($isAdmin['data'] as $user) {
                if($user['user'] == $idUser && $user['role'] == 'administrators'){
                    return response()->json([
                        'admin' => TRUE
                    ]);
                }
            }
        }
        
        return response()->json([
            'admin' => FALSE
        ]);
    }

}
