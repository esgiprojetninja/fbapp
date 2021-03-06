<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = [
        'id_contest',
        'id_user',
        'id_fb_photo',
        'fb_source',
        'voted_for',
        'nb_votes',
        'accepted_cgu',
        'id_participation_post'
    ];

    /**
    * Get the user record associated.
    */
    public function user()
    {
        return $this->hasOne('App\User');
    }

    public function setIdUser($id)
    {
        $this->id_user = (int) $id;
    }

    public function setIdContest($id)
    {
        $this->id_contest = (int) $id;
    }

    public function setIdPhoto($id)
    {
        $this->id_fb_photo = (int) $id;
    }

    public function setVotedFor($id)
    {
        $this->voted_for = (int) $id;
    }

    public function setNbVotes($id)
    {
        $this->nb_votes = (int) $id;
    }

    public function setSource($s)
    {
        $this->fb_source = $s;
    }

    public function addVote($id)
    {
        $this->nb_votes++;
    }

    public function setAcceptedCgu($id)
    {
        $this->accepted_cgu = (int) $id;
    }

    public function setPublishPostId($string)
    {
        $this->id_participation_post = $string;
    }

    /**
    * Know if user is in tournament
    *
    * @return Response
    */
    public static function isUserPlayingContest($iduser, $idcontest)
    {
        return !empty(Participant::
            where('id_user', $iduser)
            ->where('id_contest', $idcontest)
            ->whereNotNull('id_fb_photo')
            ->get()->toArray());
    }

}
