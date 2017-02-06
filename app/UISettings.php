<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UISettings extends Model
{
     protected $table = 'uisettings';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'colorOne',
        'colorTwo',
        'img',
        'imgArray'
    ];
}
