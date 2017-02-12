<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Contest;
use App\User;
//Email purposes
use Illuminate\Support\Facades\Mail;
use App\Mail\endContestMail;
use App\Mail\endContestWinnerMail;

class ContestController extends Controller
{
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function index()
    {
        $contests = Contest::all();
        return response()->json([
            'contests' => $contests
        ]);
    }

    /**
    * Show the form for creating a new resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function create(Request $request)
    {
        //
    }

    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function store(Request $request)
    {
        //If the contest need to be active then we check if there is allready one and update it to inactive
        if(isset($request->all()['state']) && $request->all()['state'] == 1){
            if(ContestController::currentlyActive()){
                ContestController::setInactiveAll();
            }
        }

        if (array_key_exists('id', $request->all())) {
            $contest = Contest::find($request->all()['id']);
            $contest->fill($request->all());
        }
        else {
            $contest = new Contest($request->all());
            $contest->setIdCreator(Auth::user()->id);
            $contest->setDates();
        }
        if($contest->save()) {
            return response()->json([
                'status' => 'ok'
            ]);
        }
    }

    /**
    * Show one contest.
    *
    * @return Response
    */
    public function show($id)
    {
        $contest = Contest::find($id);
        return response()->json([
            'contest' => $contest
        ]);
    }

    /**
    * Show the first contest.
    *
    * @return Response
    */
    public function getFirst()
    {
        $contest = Contest::orderBy('id', 'asc')->first();
        return response()->json([
            'contest' => $contest
        ]);
    }

    /**
    * Show the last contest.
    *
    * @return Response
    */
    public function getLast()
    {
        $contest = Contest::orderBy('id', 'desc')->first();
        return response()->json([
            'contest' => $contest
        ]);
    }

    /**
    * Show all contests ended.
    *
    * @return Response
    */
    public function getEnded()
    {
        $contest = Contest::where('state', '0')->first();
        return response()->json([
            'contest' => $contest
        ]);
    }

    /**
    * Show in current contest.
    *
    * @return Response
    */
    public function getCurrent()
    {
        $contest = Contest::where('state', '1')->get()->first();
        return response()->json([
            'contest' => $contest
        ]);
    }

    /**
    * Return true if there is a contest currently.
    *
    * @return boolean
    */
    public static function currentlyActive()
    {
        $contest = Contest::where('state', '1')->get();
        if(!empty($contest->toArray())){
            return TRUE;
        }else{
            return FALSE;
        }
    }

    /**
    * Show all contests by an id creator.
    *
    * @return Response
    */
    public function getContestsByIdCreator($idCreator)
    {
        $contest = Contest::where('id_creator', $idCreator)->get();
        return response()->json([
            'contest' => $contest
        ]);
    }

    /**
    * Return the contests by an id winner.
    *
    * @return Response
    */
    public function getContestByIdWinner($idWinner)
    {
        $contest = Contest::where('id_winner', $idWinner)->get();
        return response()->json([
            'contest' => $contest
        ]);
    }


    /**
    * Sending endContest Mail
    *
    * @return boolean
    */
    public function sendEndContestMail(Request $request)
    {
        $fb = new \App\Facebook();
        $admins = $fb->getAdminMail();

        $winnerId = Contest::where('state',1)->value('id_winner');
        if($winnerId != 0) {
            $winnerName = User::where('id',$winnerId)->value('name');
        }else{
            $winnerName = "undefined";
        }

        $contestName = Contest::where('state',1)->value('title');

        return response()->json([
            'admins' => $admins,
            'winnerName' => $winnerName,
            'contestName' => $contestName
        ]);

        /*
        $contestName = "Le concours des gens très heureux";

        Mail::send(new endContestMail($contestName, $winnerName), [], function() use ($participants)
        {
            $message->to($participants);
        });*/

    }

    /**
    * Set active the contest by it id and put the other as inactive
    *
    * @return contest
    */
    public function setActiveContestById($idContest)
    {
        ContestController::setInactiveAll();
        $contest = Contest::find($idContest);
        if($contest){
            $contest->update(['state'=>1]);
        }
        return response()->json([
            'contest' => $contest
        ]);
    }


    /**
    * Set all contests inactive
    *
    * @return contest
    */
    public static function setInactiveAll()
    {
        Contest::where('state','1')->update(['state'=>0]);
    }


    /**
    * Show the form for editing the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function edit($id)
    {
        //
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function update(Request $request, $id)
    {
        //
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function destroy($id)
    {
        Contest::destroy($id);
    }
}
