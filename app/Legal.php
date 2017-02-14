<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Legal extends Model
{
    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = [
        'cgu', 'privacy_policy', 'rules'
    ];
}
