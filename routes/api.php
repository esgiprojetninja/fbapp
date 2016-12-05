<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

/*Route::get('/concours', function (Request $request) {
    return $request->concours();
})->middleware('auth:api')*/

Route::get('/concours', function () {
    return "Liste des concours";
});

Route::get('/concours/{id}', function ($id) {
    return "Résumé du concours ".$id;
})->where('id','[0-9]+');
