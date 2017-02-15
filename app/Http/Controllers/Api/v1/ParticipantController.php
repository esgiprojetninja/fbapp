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
     * Returns the participation's publish model
     * @return \Illuminate\Http\Response
    **/
    public function getPublishPreviewForm(){
        $contest = Contest::getCurrent();
        $contest_title = empty($contest) ? '"nom_du_tournoi_en_cours"' : '"'.$contest['title'].'"';
        $photo_source = "homeCarousel.jpg";
        $fb = new \App\Facebook();
        $postContent = $fb::getPublishArray($photo_source, $contest_title);
        $user = Auth::user();
        $postContent['profile_icon_url'] = empty($user) ? false : $fb->getProfileIconPic($user['token']);
        $postContent['user_name'] = empty($user) ? false : $user['name'];
        return response()->json($postContent);
    }

    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function store(Request $request, $photo_id = 0)
    {
        $publish_authorization = $request->input('publishAuthorization');
        $publish_authorization = $publish_authorization === "true" ? true : false;
        $user = Auth::user();
        $contest = Contest::getCurrent();
        $fb = new \App\Facebook();
        $photo_array = $photo_id !== 0 ? $fb->getPhotoById($photo_id, $user['token']) : [];
        $photo_source = $photo_array !== 0 ? $photo_array['webp_images'][0]['source'] : 0;

        // Error handling
        $error_msg = false;
        $error_msg = Participant::isUserPlayingContest($user['id'], $contest['id']) ? "Vous avez déjà posté une photo pour le concours" : $error_msg;
        $error_msg = (!$contest) ? "Aucun concours actif" : $error_msg;
        $error_msg = (!ctype_digit($photo_id)) ? "requires number" : $error_msg;
        if ($error_msg) {
            return response()->json([
                'error' => true,
                'msg' => $error_msg
            ]);
        }

        return $this->saveParticipant($photo_id, $user, $contest, $photo_source, $publish_authorization);
    }

    /**
     * Save a newly created participant in the db
     * @param  Number  $photo_id
     * @param  App\User $user
     * @param  App\Contest $contest
     * @param  String $photo_source
     * @return \Illuminate\Http\Response
     */
    public function saveParticipant($photo_id, $user, $contest, $photo_source, $publish_authorization = false) {
        $participant = new Participant();
        $participant->setIdUser($user['id']);
        $participant->setIdContest($contest['id']);
        $participant->setIdPhoto($photo_id);
        $participant->setVotedFor(0);
        $participant->setNbVotes('0');
        $participant->setAcceptedCgu('1');
        if ($photo_source !== 0) {
            $participant->setSource($photo_source);
        }

        $user = Auth::user();
        $contest = Contest::getCurrent();
        $fb = new \App\Facebook();

        if ( $publish_authorization ) {
            $publishId = $fb->publishParticipationMessage($user['token'], $photo_source, $contest['title']);
            if ( $publishId != false ) {
                $participant->setPublishPostId($publishId);
            }
        }

        try {
            $participant->save();
        } catch(Exception $e) {
            return response()->json([
                'error' => true,
                'msg' => 'Une erreur est survenue lors de la sauvegarde de votre photo.'
            ]);
        }

        return response()->json([
            'participant' => $participant
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
        $allGood = false;
        $user = Auth::user();
        if ( empty($user) ) {
            return response()->json([
                'error' => true,
                'msg' => 'Non authentifié'
            ]);
        }

        $contest = Contest::getCurrent();
        if ( empty($contest) ) {
            return response()->json([
                'error' => true,
                'msg' => 'Aucun concours actif en cours'
            ]);
        }
        $aimed_participant = Participant::where('id', $request->input('id'))
            ->where('id_fb_photo', '<>', '0')
            ->where('fb_source', '<>', '0')
            ->where('id_contest', $contest['id'])->first();
        if ( empty($aimed_participant) ) {
            return response()->json([
                'error' => true,
                'msg' => "La photo choisie n'est pas enregistrée dans le concours"
            ]);
        }

        $voting_participant = Participant::where('id_user', $user['id'])->where('id_contest', $contest['id'])->first();
        // Participation conditions seem fine
        if (empty($voting_participant)) {
            $voting_participant = array(
                'id_contest' => $contest['id'],
                'id_user' => $user['id'],
                'id_fb_photo' => 0,
                'fb_source' => 0,
                'nb_votes' => 0,
                'accepted_cgu' => 1,
                'voted_for' => $aimed_participant['id']
            );
            if ( Participant::insert($voting_participant) ) {
                $allGood = true;
            } else {
                return response()->json([
                    'error' => true,
                    'msg' => "Votre vote n'a pu être pris en compte, faîtes nous donc signe si le problème persiste !"
                ]);
            }
        }
        // User already participating
        else {
            // User already voted
            if ( $voting_participant['voted_for'] != '0' ) {
                return response()->json([
                    'error' => true,
                    'msg' => "Vous avez déjà voté pour ce concours"
                ]);
            }
            // Participation conditions seem fine
            else {
                if ( $voting_participant->update(['voted_for' => $aimed_participant['id']]) )
                    $allGood = true;
                else {
                    return response()->json([
                        'error' => true,
                        'msg' => "Désolé votre vote n'a pas pu être pris en compte, n'hésitez pas à contacter un administrateur si le problème persiste."
                    ]);
                }
            }
        }
        if ( $allGood ) {
            // If user was rightfully updated we can now increase the aimed_participant's votes number
            $newNbVotes = (int) $aimed_participant['nb_votes'] + 1;
            if ( $aimed_participant->update(['nb_votes' => $newNbVotes]) ) {
                return response()->json([
                    'connected_participant' => $voting_participant,
                    'aimed_participant' => $aimed_participant
                ]);
            } else {
                return response()->json([
                    'error' => true,
                    'msg' => "Votre vote n'a pu être pris en compte, contactez un administrateur si le problème persiste."
                ]);
            }
        }
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
              'msg' => 'Droits d\'admin requis',
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
        'msg' => 'Erreur inconnue',
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
        $participant = [];
        if (!empty($currentContest)) {
          $participant = Participant::where('id_contest', $currentContest->getId())
                                            ->where('id_user', Auth::user()->id)
                                            ->get()
                                            ->first();
        }
        if (empty($participant)){
            $participant = [];
        }
        // https://github.com/laravel/framework/blob/master/src/Illuminate/Http/JsonResponse.php#L24
        // We want an empty object if no current participant
        return response()->json([
            'participant' => $participant
        ], 200, [], JSON_FORCE_OBJECT);
    }
}
