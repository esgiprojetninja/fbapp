<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUISettingsTable extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        Schema::create('uisettings', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('main_color');
            $table->string('gallery_color');
            $table->string('submenu_img');
            $table->string('carousel_img_array');
            $table->boolean('enable_fullscreen');
        });
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        Schema::dropIfExists('uisettings');
    }
}
