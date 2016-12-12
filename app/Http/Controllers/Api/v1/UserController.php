<?php

namespace App\Http\Controllers\Api\v1;

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
    * Create one contest.
    *
    * @return Response
    */
    public function create()
    {
        $response = DB::table('contests')->insert([
            'id_winner' => 0 ,
            'start_date' => $_POST['start_date'] ,
            'end_date' => $_POST['end_date'] ,
            'state' => 1 ,
            'description' => $_POST['description'] ,
            'end_msg' => $_POST['end_msg'] ,
            'title' => $_POST['title'] ,
            'id_creator' => $_POST['id_creator'] ,
            'id_theme' => $_POST['id_theme'] ,
            'created_at' => \Carbon\Carbon::now()
        ]);

        return response()->json([
            'error' => false,
            'response' => $response,
            'status_code' => 200
        ]);
    }
}
