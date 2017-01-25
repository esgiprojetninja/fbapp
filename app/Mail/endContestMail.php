<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class endContestMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $winner;
    protected $contestName;

    /**
    * Create a new message instance.
    *
    * @return void
    */
    public function __construct()
    {
        $this->winner = "Jean Paul";
        $this->contestName = "Le concours des gens heureux";
    }

    /**
    * Build the message.
    *
    * @return $this
    */
    public function build()
    {
        return $this->view('emails.endContest')
        ->with([
            'winner' => $this->winner,
            'contestName' => $this->contestName,
        ]);
    }
}
