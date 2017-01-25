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

    /**
    * Create a new message instance.
    *
    * @return void
    */
    public function __construct($contestName)
    {
        $this->contestName = $contestName;
    }

    /**
    * Build the message for the loosers.
    *
    * @return $this
    */
    public function build()
    {
        return $this->view('emails.endContest')
        ->with([
            'contestName' => $this->contestName,
        ]);
    }
}
