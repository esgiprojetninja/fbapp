<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controlers\ContestController;
use App\Participant;
use App\Contest;

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
        if ( Contest::currentlyActive() ) {
         $currentContest = Contest::getCurrent();
         $currentUser = Auth::user();
         if ( !!$currentContest && !!$currentUser ) {
           $currentContest = $currentContest->getAttributes();
           $currentUser = $currentUser->getAttributes();
           if ( !Participant::isUserPlayingContest($currentUser['id'], $currentContest['id']) ) {
            $fb = new \App\Facebook();
            $photoArr = $fb->getPhotoById($photo_id, $currentUser['token']);
            if ( !!$photoArr && $photoArr['from']['id'] == $currentUser['fb_id'] ) {
              $source = $photoArr['webp_images'][0]['source'];
              $participant = new Participant();
              $participant->setIdUser($currentUser['id']);
              $participant->setIdContest($currentContest['id']);
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
                    'user_fbid' => $currentUser['fb_id'],
                    'current_contest_id' => $currentContest['id'],
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
         $msg = "Aucun concours actif";
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
    * Remove the specified resource from storage.
    * Admin rights necessary if $id_user & $id_contest are specified
    *
    * @param  int  $id_user, int $id_contest
    * @return \Illuminate\Http\Response
    */
    public function destroyByIdUserAndIdContest(Request $request)
    {
      $user = Auth::user();
      if ( !!$user ) {
        $uId = $request->input('user_id');
        $cId = $request->input('contest_id');
        $contest = Contest::getCurrent();
        if ( !ctype_digit($uId) || !ctype_digit($cId) ) {
          $uId = $user->id;
          $cId = $contest->id;
        } else {
          if ( $user->isAdmin != true ) {
            return response()->json([
              'error' => true,
              'deleted' => false
            ]);
          }
        }
        $r = (bool) Participant::where('id_user', $uId)
          ->where('id_contest', $cId)
          ->forceDelete();
        if ( $r ) {
          return response()->json([
            'deleted' => true
          ]);
        }
      }
      return response()->json([
        'error' => true,
        'deleted' => false
      ]);
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
    * Show all photos of one contest.
    *
    * @return Response
    */
    public function getParticipantsByContest($idContest)
    {
        $currentContest = Contest::where('state', 1)->get();
        $participants = Participant::where('id_contest', $idContest)->get();
        return response()->json([
            'participants' => $participants
        ]);
    }

    /**
    * Show connected participant.
    *
    * @return Response
    */
    public function getCurrentParticipant()
    {
        $currentContest = Contest::where('state', 1)->get()->first();

        $participant = Participant::where('id_contest', $currentContest->getId())
                                            ->where('id_user', Auth::user()->id)
                                            ->get()
                                            ->first();
        return response()->json([
            'participant' => $participant
        ]);
    }
}
