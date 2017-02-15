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
    protected $pageFb;

    /**
    * Create a new message instance.
    *
    * @return void
    */
    public function __construct($contestName, $winnerName, $pageFb)
    {
        $this->contestName = $contestName;
        $this->winnerName = $winnerName;
        $this->pageFb = $pageFb;
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
            'winnerName' => $this->winnerName,
            'pageFb' => $this->pageFb
        ]);
    }
}
