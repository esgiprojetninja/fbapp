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


Route::group(['prefix' => '/v1'], function () {
  //Route::get('contests',      'Api\v1\UserController@index');
  //Route::get('contest/{id}', 'Api\v1\UserController@show');
  Route::get('/contests','Api\v1\Contest@index');
  Route::get('/contest/{id}','Api\v1\Contest@show');
  Route::put('/contest/{id}','Api\v1\Contest@update');
  Route::post('/contest','Api\v1\Contest@create');
  Route::delete('/contest/{id}','Api\v1\Contest@delete');
});
