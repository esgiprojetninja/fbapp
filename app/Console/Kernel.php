<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Contest;
use App\Participant;
use DB;
use App\Http\Controllers\Api\v1\ContestController;

class Kernel extends ConsoleKernel
{
    /**
    * The Artisan commands provided by your application.
    *
    * @var array
    */
    protected $commands = [
        //
    ];

    /**
    * Define the application's command schedule.
    *
    * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
    * @return void
    */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            $now = date('Y-m-d H:i:s');
            $endDate = Contest::where('state', 1)->value('end_date');
            if($now >= $endDate){
                $idWinner = Participant::where('nb_votes',Participant::where('id_contest',Contest::where('state', 1)->value('id'))->max('nb_votes'))->value('id');
                Contest::where('state', 1)->update(['id_winner'=>$idWinner]);
                ContestController::sendEndContestMail();
                ContestController::postOnFBEnd();
                Contest::where('state', 1)->update(['state'=>2]);
            }
        })->dailyAt('00:01');
    }

    /**
    * Register the Closure based commands for the application.
    *
    * @return void
    */
    protected function commands()
    {
        require base_path('routes/console.php');
    }
}
