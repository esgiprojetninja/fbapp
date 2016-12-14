<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contest extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_winner',
        'start_date',
        'end_date',
        'state',
        'description',
        'end_msg',
        'title',
        'id_creator',
        'id_theme'
    ];
}
