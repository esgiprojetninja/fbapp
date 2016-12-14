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
            $table->timestamps();
            $table->integer('id_winner');
            $table->datetime('start_date');
            $table->datetime('end_date');
            $table->tinyInteger('state');
            $table->string('description');
            $table->string('end_msg');
            $table->string('title');
            $table->integer('id_creator');
            $table->integer('id_theme');
        });
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
