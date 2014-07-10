<?php

class HomeController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/

	public function index()
	{
		return View::make('index');
	}

	public function dates()
	{
		$dm = DiffManager::get();
		return Response::json($dm->getDates());
	}

	public function versions($timestamp)
	{
		$dm = DiffManager::get();
		return Response::json($dm->getVersions($timestamp));
	}

	public function languages($timestamp, $languages)
	{
		$dm = DiffManager::get();
		return Response::json($dm->getLanguages($timestamp, $languages));
	}

	public function compare()
	{
		$toCompare = Input::all();
		$files = array();

		foreach ($toCompare as $cmp)
		{
			$timestamp = $cmp['timestamp'];
			$version = $cmp['version'];
			$lc = $cmp['language'];

			if (
				preg_match('/\d+/', $timestamp) &&
				preg_match('/^\d+(?:\.\d+)*$/', $version) &&
				preg_match('/^[a-z]{2,3}-[A-Z]{2}$/', $lc)
			)
			{
				$ok[] = $cmp;
			}
		}

		$dm = DiffManager::get();
		return Response::json($dm->compare($ok));
	}

	public function update()
	{
		$dm = DiffManager::get();
		return Response::json($dm->update());
	}
}
