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
        'has_voted',
        'nb_votes',
        'accepted_cgu'
    ];

    /**
    * Get the user record associated.
    */
    public function user()
    {
        return $this->hasOne('App\User');
    }

}
