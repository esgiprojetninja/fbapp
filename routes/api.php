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


// Participants API routes
Route::group(['middleware' => ['api'], ['only' => ['index', 'show']], 'prefix' => '/v1'], function () {
    Route::resource('participants', 'Api\v1\ParticipantController');
});

// API routes
Route::group(['middleware' => 'api', 'prefix' => '/v1'], function () {
    Route::get('/contests/current', 'Api\v1\ContestController@getCurrent');
    Route::put('/contests/{id}/activate', 'Api\v1\ContestController@setActiveContestById');
    Route::get('/auth/me/', 'Api\v1\AuthController@getMe');
    Route::get('/auth/logout/', 'Api\v1\AuthController@logout');
    Route::get('/auth/isAdmin/', 'Api\v1\AuthController@isAdmin');
    Route::put('/participants/{id}/add', 'Api\v1\ParticipantController@store');
    Route::post('/participants/deleteFromCurrent', 'Api\v1\ParticipantController@destroyByIdUserAndIdContest');
    Route::get('/participants/current', 'Api\v1\ParticipantController@getParticipantsByContest');
});

// Admin API routes
Route::group(['middleware' => ['api', 'admin'], 'prefix' => '/v1'], function () {
    Route::resource('contests', 'Api\v1\ContestController');
    Route::resource('participants', 'Api\v1\ParticipantController');
});
