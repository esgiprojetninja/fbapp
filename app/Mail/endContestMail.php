<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class endContestMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $contestName;
    protected $winnerName;

    /**
    * Create a new message instance.
    *
    * @return void
    */
    public function __construct($contestName, $winnerName)
    {
        $this->contestName = $contestName;
        $this->winnerName = $winnerName;
    }

    /**
    * Build the message for the loosers.
    *
    * @return $this
    */
    public function build()
    {
        return $this->view('emails.endContest')
        ->subject('Résultat concours')
        ->with([
            'contestName' => $this->contestName,
            'winnerName' => $this->winnerName
        ]);
    }
}
