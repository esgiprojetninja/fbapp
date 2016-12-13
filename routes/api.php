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


Route::group(['middleware' => 'checkAdmin','prefix' => '/v1'], function () {

    /*
    * CONTESTS
    */

    //GET REQUEST
    Route::get('/contests','Api\v1\Contest@index');
    Route::get('/contest/first','Api\v1\Contest@getFirst');
    Route::get('/contest/last','Api\v1\Contest@getLast');
    Route::get('/contests/ended','Api\v1\Contest@getEnded');
    Route::get('/contest/current','Api\v1\Contest@getCurrent');
    Route::get('/contests/creator/{idCreator}','Api\v1\Contest@getContestsByIdCreator');
    Route::get('/contest/{id}','Api\v1\Contest@show');
    Route::get('/contest/winner/{idWinner}','Api\v1\Contest@getContestByIdWinner');

    //PUT REQUEST
    Route::put('/contest/{id}','Api\v1\Contest@update');

    //POST REQUEST
    Route::post('/contest','Api\v1\Contest@create');

    //DELETE REQUEST
    Route::delete('/contest/{id}','Api\v1\Contest@delete');

});

Route::group(['middleware' => 'api', 'prefix' => '/v1'], function () {
    /**
    * USERS
    */
    // GET
    Route::get('/auth/me/', 'Api\v1\AuthController@getMe');
    Route::get('/auth/logout/', 'Api\v1\AuthController@logout');

});
