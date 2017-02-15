<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Contest;
use App\Participant;
use App\User;
//Email purposes
use Illuminate\Support\Facades\Mail;
use App\Mail\endContestMail;

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
            if(Contest::currentlyActive()){
                ContestController::setInactiveAll();
            }
        }

        if (array_key_exists('id', $request->all())) {
            $contest = Contest::find($request->all()['id']);
            $contest->fill($request->all());
            $contest->formatDates();
        }
        else {
            $contest = new Contest();
            $contest->setIdCreator(Auth::user()->id);
            $contest->fill($request->all());
            $contest->formatDates();
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
        if (!empty($contest)) {
            $contest->participants = Participant::where('id_contest', $contest->getId())->get();
        }
        if ($contest == null) {
            $contest = [
                'participants' => []
            ];
        }
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
        return Contest::currentlyActive();
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
    * Post on facebook at the end
    *
    * @return boolean
    */
    public static function postOnFBEnd()
    {
        $currentContest = Contest::where('state', 1)->value('id');
        $participants = Participant::where('id_contest', $currentContest)->get()->toArray();
        $fb = new \App\Facebook;
        $idWinner = Contest::where("state",1)->value('id_winner');
        $idParticipant = Participant::where("id",$idWinner)->value('id_user');
        $nomGagnant = User::where("id",$idParticipant)->value('name');
        $contestName = Contest::where('state',1)->value('title');
        $explication = Contest::where('state',1)->value('end_msg');
        $idPhoto = Participant::where('id',$idWinner)->value('id_fb_photo');

        $token = env('FACEBOOK_APP_SECRET_ID');

        $photo_source = Participant::where('id',$idWinner)->value('fb_source');

        $message = "Bravo à ". $nomGagnant ." qui gagne le concours ". $contestName ." organisé par Pardon Maman.\n".$explication."\n Merci à toutes et tous d'avoir participé!";
        foreach($participants as $participant)
        {
            $fb_id = User::where('id',$participant['id_user'])->value('fb_id');
            $fb->publishParticipationMessageAfterContest($token, $fb_id, $message, $photo_source);
        }
    }

    /**
    * Sending endContest Mail
    *
    * @return boolean
    */
    public static function sendEndContestMail()
    {
        $fb = new \App\Facebook();
        //$admins = $fb->getAdminMail();
        $admins = ['lambot.rom@gmail.com'];
        $idWinner = Contest::where("state",1)->value('id_winner');
        $idParticipant = Participant::where("id",$idWinner)->value('id_user');
        $nomGagnant = User::where("id",$idParticipant)->value('name');
        $contestName = Contest::where('state',1)->value('title');
        $pageFb = "https://www.facebook.com/".User::where("id",$idParticipant)->value('fb_id');

        foreach($admins as $admin){
            Mail::to($admin)->send(new endContestMail($contestName, $nomGagnant, $pageFb));
        }
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
