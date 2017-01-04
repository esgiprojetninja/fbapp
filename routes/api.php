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


// Admin API routes
Route::group(['middleware' => ['api', 'admin'], 'prefix' => '/v1'], function () {
    Route::resource('contests', 'Api\v1\ContestController');
});

// Participants API routes
Route::group(['middleware' => ['api', 'admin'], 'prefix' => '/v1'], function () {
    Route::resource('participants', 'Api\v1\ParticipantController');
});


// API routes
Route::group(['middleware' => 'api', 'prefix' => '/v1'], function () {
    /*
    * CONTESTS
    */

    //GET REQUEST
    // Route::get('/contests','Api\v1\Contest@index');
    // Route::get('/contest/first','Api\v1\Contest@getFirst');
    // Route::get('/contest/last','Api\v1\Contest@getLast');
    // Route::get('/contests/ended','Api\v1\Contest@getEnded');
    Route::get('/contests/current','Api\v1\ContestController@getCurrent');
    Route::put('/contests/{id}/activate','Api\v1\ContestController@setActiveContestById');
    // Route::get('/contests/creator/{idCreator}','Api\v1\Contest@getContestsByIdCreator');
    // Route::get('/contest/{id}','Api\v1\Contest@show');
    // Route::get('/contest/winner/{idWinner}','Api\v1\Contest@getContestByIdWinner');

    //Route::get('/participants/{id}','Api\v1\ParticipantController@show');
    //Route::get('/participants/contest/{idContest}','Api\v1\ParticipantController@contest');
    Route::get('/participants/contest/{idContest}/photos','Api\v1\ParticipantController@photoByContest');

    /**
    * USERS
    */
    // GET
    Route::get('/auth/me/', 'Api\v1\AuthController@getMe');
    Route::get('/auth/logout/', 'Api\v1\AuthController@logout');

});
