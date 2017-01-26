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
    public function handleProviderCallback()
    {
        $fbUser = Socialite::driver('facebook')->user();
        $query = User::where('fb_id', $fbUser->id)->get();
        if ($query->isEmpty()) {
            $user = new User($fbUser->user);
            $user->setFbId($fbUser->getId());
            $user->setToken($fbUser->token);
            $user->save();
            Auth::login($user, true);
        } else {
            $user = $query->first();
            $user->setToken($fbUser->token);
            $user->save();
            Auth::login($query->first(), true);
        }
        return redirect()->route('home', '/');
    }

    /**
    * Redirect the user to the Facebook authentication page with more scopes.
    *
    * @return Response
    */
    public function redirectToProviderJoiningContest()
    {
        return Socialite::driver('facebook')->scopes([
                'email', 'public_profile','user_photos'
                ])->redirect();
    }

}
