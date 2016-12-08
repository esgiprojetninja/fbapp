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
    $response = DB::table('contests')->get();

    return response()->json([
      'error' => false,
      'response' => $response,
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
    $response = DB::table('contests')->where('id','=',$id)->get();
    return response()->json([
      'error' => false,
      'response' => $response,
      'status_code' => 200
    ]);
  }

  /**
  * Show the first contest.
  *
  * @return Response
  */
  public function getFirst()
  {
    $response = DB::table('contests')->orderBy('id', 'asc')->first();
    return response()->json([
      'error' => false,
      'response' => $response,
      'status_code' => 200
    ]);
  }

  /**
  * Show the last contest.
  *
  * @return Response
  */
  public function getLast()
  {
    $response = DB::table('contests')->orderBy('id', 'desc')->first();
    return response()->json([
      'error' => false,
      'response' => $response,
      'status_code' => 200
    ]);
  }

  /**
  * Show all contests ended.
  *
  * @return Response
  */
  public function getEnded()
  {
    $response = DB::table('contests')->where('state', '=','0')->first();
    return response()->json([
      'error' => false,
      'response' => $response,
      'status_code' => 200
    ]);
  }

  /**
  * Show in progress contest.
  *
  * @return Response
  */
  public function getCurrent()
  {
    $response = DB::table('contests')->where('state', '=','1')->get();
    return response()->json([
      'error' => false,
      'response' => $response,
      'status_code' => 200
    ]);
  }

  /**
  * Show all contests added by an id creator.
  *
  * @return Response
  */
  public function getContestsByIdCreator($idCreator)
  {
    $response = DB::table('contests')->where('id_creator', '=',$idCreator)->get();
    return response()->json([
      'error' => false,
      'response' => $response,
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

  /**
  * Delete one contest by id.
  *
  * @return Response
  */
  public function delete($id)
  {

    $response = DB::table('contests')->where('id','=',$id)->delete();

    return response()->json([
      'error' => false,
      'response' => $response,
      'status_code' => 200
    ]);
  }


}
