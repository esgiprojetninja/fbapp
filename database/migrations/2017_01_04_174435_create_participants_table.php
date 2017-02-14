<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParticipantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('participants', function (Blueprint $table) {
            $table->increments('id', true);
            $table->timestamps();
            $table->integer('id_contest');
            $table->integer('id_user')->unsigned();
            $table->string('id_fb_photo');
            $table->string('fb_source');
            $table->boolean('has_voted')->default(false);
            $table->integer('nb_votes')->default(0);
            $table->boolean('accepted_cgu');
            $table->string('id_participation_post')->default('0');
            $table->foreign('id_user')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('participants');
    }
}
