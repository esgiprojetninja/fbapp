<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContestsTable extends Migration
{
  /**
  * Run the migrations.
  *
  * @return void
  */
  public function up()
  {
    Schema::create('contests', function (Blueprint $table) {
      $table->increments('id');
      $table->integer('id_winner');
      $table->datetime('start_date');
      $table->datetime('end_date');
      $table->tinyInteger('state');
      $table->string('description');
      $table->string('end_msg');
      $table->string('title');
      $table->integer('id_creator');
      $table->integer('id_theme');
      $table->timestamps();
    });

    DB::table('contests')->insert([
      'id_winner' => 0,
      'start_date' => '2016-12-05 10:00:00',
      'end_date' => '2016-12-25 17:00:00',
      'state'=>1,
      'description'=>'Ceci est le premier concours',
      'end_msg'=>'A plus',
      'title'=>'C\'est un concours intéréssant #ClickBait',
      'id_creator'=>1,
      'id_theme'=>1
    ]);
}

/**
* Reverse the migrations.
*
* @return void
*/
public function down()
{
  Schema::dropIfExists('contests');
}
}
