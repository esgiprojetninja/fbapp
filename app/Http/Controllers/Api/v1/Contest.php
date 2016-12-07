<?php

namespace App\Http\Controllers\Api\v1;

use App\User;
use App\Http\Controllers\Controller;
use DB;

class Contest extends Controller
{



  /**
  * Show all the contests.
  *
  * @return Response
  */
  public function index()
  {
    //return DB::table('contests')->get()->toJson();
    return response()->json([
      'error' => false,
      'response' => "[GET] show all contests",
      'status_code' => 200
    ]);
  }

  /**
  * Show one contest.
  *
  * @return Response
  */
  public function show($id)
  {
    //return DB::table('contests')->where('id','=',$id)->get()->toJson();
    return response()->json([
      'error' => false,
      'response' => "[GET] show one contest by id",
      'status_code' => 200
    ]);
  }

  /**
  * Update one contest.
  *
  * @return Response
  */
  public function update($id)
  {
    return response()->json([
      'error' => false,
      'response' => "[PUT] update one contest by id",
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
    return response()->json([
      'error' => false,
      'response' => "[POST] contest created",
      'status_code' => 200
    ]);
  }

  /**
  * Delete one contest by id.
  *
  * @return Response
  */
  public function delete($id)
  {
    return response()->json([
      'error' => false,
      'response' => "[DELETE] Delete one contest by id",
      'status_code' => 200
    ]);
  }


}
