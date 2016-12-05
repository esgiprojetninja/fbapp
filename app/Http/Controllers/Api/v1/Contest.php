<?php

namespace App\Http\Controllers\Api\v1;

use App\User;
use App\Http\Controllers\Controller;

class Contest extends Controller
{

  /**
  * Show all the contests.
  *
  * @return Response
  */
  public function index()
  {
    return "all contest";
  }

  /**
  * Show one contest.
  *
  * @return Response
  */
  public function show($id)
  {
    return "contest".$id;
  }

}
