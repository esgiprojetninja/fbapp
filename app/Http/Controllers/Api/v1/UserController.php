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

    public function login() {
        if (Auth::attempt(['email' => $_POST['email'], 'fb_id' => $_POST['fb_id']])) {
            return response()->json([
                'logged' => 200
            ]);
        } else {
            return $this->create($_POST);
        }
    }
}
