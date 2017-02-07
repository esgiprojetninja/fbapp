<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUisettingsTable extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        Schema::create('UISettings', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('main_color');
            $table->string('gallery_color');
            $table->string('submenu_img');
            $table->string('carousel_img_array');
            $table->string('fullscreen');
        });
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        Schema::dropIfExists('UISettings');
    }
}
