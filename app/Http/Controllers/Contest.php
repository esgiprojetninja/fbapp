<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;

class Contest extends Controller
{
  /**
  * Show all the contests.
  *
  * @return Response
  */
  public function showAll()
  {
    return view('contest.all', ['contest' => Contest::findOrFail()]);
  }
}
