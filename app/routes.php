<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', 'HomeController@index');
Route::get('/dates', 'HomeController@dates');
Route::get('/dates/{timestamp}', 'HomeController@versions');
Route::get('/dates/{timestamp}/{lc}', 'HomeController@languages');
Route::post('/compare', 'HomeController@compare');
