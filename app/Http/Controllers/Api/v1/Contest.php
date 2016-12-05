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
    $contests = DB::table('contests')->get();
    return $contests->toJson();
  }

  /**
  * Show one contest.
  *
  * @return Response
  */
  public function show($id)
  {
    $contest = DB::table('contests')->where('id','=',$id)->get();
    return $contest->toJson();
  }

}
