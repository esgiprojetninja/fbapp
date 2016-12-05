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

/*
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

*/
Route::get('/{apiVersion}/{apiKey}/contests',function($apiVersion,$akiKey){
  return "Retourne la liste des concours ";
});


Route::get('/{apiVersion}/{apiKey}/contest/{id}',function($apiVersion,$apiKey,$id){
  return "Retourne le concours qui a pour id : ".$id;
})->where('id','[0-9]+');
