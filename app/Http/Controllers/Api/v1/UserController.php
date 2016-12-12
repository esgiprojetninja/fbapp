<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Support\Facades\Auth;

use App\User;
use App\Http\Controllers\Controller;
use DB;

class UserController extends Controller
{
    /**
    * Show all users
    * @return [array] users
    */
    public function all()
    {
        $response = DB::table("users")->get();

        return response()->json([
          'error' => false,
          'response' => $response,
          'status_code' => 200
        ]);
    }

    /**
    * Create one user.
    *
    * @return Response
    */
    public function create($data)
    {
        $response = User::create([
            'email' => $data['email'],
            'fb_id' => $data['fb_id'],
            'name' => $data['name'],
            'created_at' => \Carbon\Carbon::now()
        ]);

        return response()->json([
            'status_code' => 200,
            'response' => $response
        ]);
    }


    /**
    * Log a user in.
    *
    * @return [User] $user
    */
    public function login() {
        $user = User::where('fb_id', $_POST['fb_id'])->first();
        var_dump($user);
        if ($user->email == $_POST['email']) {
            Auth::login($user, true);
            return response()->json([
                'status_code' => 200,
                'response' => $user
            ]);
        } else {
            return $this->create($_POST);
        }
    }

    /**
    * Log a user out.
    *
    * @return [array]
    */
    public function logout() {
        Auth::logout();
        return response()->json([
            'status_code' => 200
        ]);
    }
}
