<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Participant;

class ParticipantController extends Controller
{
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function index()
    {
        $participants = Participant::all();
        return response()->json([
            'participants' => $participants
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
    public function store($photo_id)
    {
      $msg = "requires number";
      if ( ctype_digit($photo_id) ) {
        $photo_id = (int) $photo_id;
        if ( app('App\Http\Controllers\Api\v1\ContestController')->currentlyActive() ) {
         $currentContest = $this->tryJsonDecode(app('App\Http\Controllers\Api\v1\ContestController')->getCurrent());
         $currentUser = $this->tryJsonDecode(app('App\Http\Controllers\Api\v1\AuthController')->getMe());
         if ( !!$currentContest && !!$currentUser ) {
           if ( !ParticipantController::isUserPlayingContest($currentUser->user->id, $currentContest->contest->id) ) {
            $fb = new \App\Facebook();
            $photoArr = $fb->getPhotoById($photo_id, $currentUser->user->token);
            if ( !!$photoArr && $photoArr['from']['id'] == $currentUser->user->fb_id ) {
              $source = $photoArr['webp_images'][0]['source'];
              $participant = new Participant();
              $participant->setIdUser($currentUser->user->id);
              $participant->setIdContest($currentContest->contest->id);
              $participant->setIdPhoto($photo_id);
              $participant->setSource($source);
              $participant->setHasVoted('0');
              $participant->setNbVotes('0');
              $participant->setAcceptedCgu('1');
              if ( $participant->save() ) {
                return response()->json([
                    'added' => true,
                    'photo_id' => $photo_id,
                    'source' => $source,
                    'user_fbid' => $currentUser->user->fb_id,
                    'current_contest_id' => $currentContest->contest->id,
                    'photo_votes' => 0
                ]);
              } else {
                $msg = "Impossible de valider votre participation à l'heure actuelle";
              }
            }
          } else {
            $msg = "Vous avez déjà posté une photo pour le concours";
          }
         }
       } else {
         $msg = "aucun concours actif";
       }
      }
      return response()->json([
        'added' => false,
        'msg' => $msg
      ]);
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
        Participant::destroy($id);
    }

    /**
    * Show one contest.
    *
    * @return Response
    */
    public function show($id)
    {
        $participant = Participant::find($id);
        return response()->json([
            'participant' => $participant
        ]);
    }

    /**
    * Show one contest.
    *
    * @return Response
    */
    public function getPhotoByParticipant($id)
    {
        $photos = Participant::find($id)->pluck('id_fb_photo');
        return response()->json([
            'photos' => $photos
        ]);
    }

    /**
    * Show all participants of one contest.
    *
    * @return Response
    */
    public function contest($idContest)
    {
        $participant = Participant::where('id_contest', $idContest)->get();
        return response()->json([
            'participant' => $participant
        ]);
    }

    /**
    * Know if user is in tournament
    *
    * @return Response
    */
    public static function isUserPlayingContest($iduser, $idcontest)
    {
        $participant = Participant::
            where('id_user', $iduser)
            ->where('id_contest', $idcontest)
            ->whereNotNull('id_fb_photo')
            ->get();
        if(!empty($participant->toArray())){
            return TRUE;
        }else{
            return FALSE;
        }
    }

    /**
    * Show all photos of one contest.
    *
    * @return Response
    */
    public function photoByContest($idContest)
    {
        $photos = Participant::where('id_contest', $idContest)->get()->pluck('id_fb_photo');
        return response()->json([
            'photos' => $photos
        ]);
    }
}
