<?php

namespace App;

use DateTime;

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

    public function setIdCreator ($id) {
        $this->id_creator = $id;
    }

    public function getIdWinner () {
        return $this->id_winner;
    }

    public function formatDates () {
        $this->start_date = new DateTime($this->start_date);
        $this->end_date = new DateTime($this->end_date);
    }

    public static function currentlyActive(){
      return !empty(Contest::where('state', '1')->get()->toArray());
    }

    public function getId() {
        return $this->id;
    }

    public static function getCurrent () {
        return Contest::where('state', '1')->get()->first();
    }
}
