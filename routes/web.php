<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware' => ['web']], function () {

    Route::get('{slug}', ['as' => 'home', function() {
        return view('index');
    }])
    ->where('slug', '(?!auth)([A-z\d-\/_.]+)?');

    Route::get('auth/facebook', 'Auth\AuthController@redirectToProvider');
    Route::get('auth/facebook/callback', 'Auth\AuthController@handleProviderCallback');
    Route::get('auth/facebook/joinContest', 'Auth\AuthController@redirectToProviderJoiningContest');
});
