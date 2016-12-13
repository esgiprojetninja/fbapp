<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\User;
use Socialite;

class AuthController extends Controller
{
    /**
     * Redirect the user to the Facebook authentication page.
     *
     * @return Response
     */
    public function redirectToProvider()
    {
        return Socialite::driver('facebook')->fields([
            'id', 'name', 'email',
        ])->scopes([
            'email', 'public_profile'
        ])->redirect();
    }

    /**
     * Obtain the user information from Facebook.
     *
     * @return Response
     */
    public function handleProviderCallback(Request $request)
    {
        $fbUser = Socialite::driver('facebook')->user();
        $user = new User($fbUser->user);
        if (!$user = User::where('email', $fbUser->getEmail())->first()) {
            $user->setFbId($fbUser->getId());
            $user->setToken($fbUser->token);
            $user->save();
        }
        Auth::login($user, true);
        return redirect()->route('home', '/');
    }
}
