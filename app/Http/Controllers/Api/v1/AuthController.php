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

    public function isAdmin()
    {
        $isAdmin = Auth::user()->isAdmin();
        return response()->json([
            'isAdmin' => $isAdmin
        ]);
    }

    public function getToken () {
        $fbUser = Socialite::driver('facebook')->user();
        return response()->json([
            'token' => $fbUser->token
        ]);
    }
}
