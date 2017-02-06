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
            $table->string('colorOne');
            $table->string('colorTwo');
            $table->string('img');
            $table->string('imgArray');
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
