<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;

use Socialite;

class AuthController extends Controller
{
    public function getMe()
    {
      return response()->json([
          'user' => Auth::getCurrent()
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
      $user = Auth::getCurrent();
      if ( !!$user ) {
        $fb =  new \App\Facebook();
        $isAdmin = $fb->getAppRoles();
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
