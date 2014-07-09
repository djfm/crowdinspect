var app = angular.module('crowdinspect', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/views/index.html',
		controller: 'IndexCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);

app.controller('IndexCtrl', function($scope, $http) {

	$scope.versions = [];
	$scope.languages = [];
	$scope.toCompare = [];

	$http.get('/dates').then(function(resp) {
		$scope.dates = resp.data;
	});

	$scope.dateChosen = function(timestamp, date)
	{
		$scope.timestamp = timestamp;
		$scope.date      = date;
		$http.get('/dates/'+timestamp).then(function(resp) {
			$scope.versions = resp.data;
		});
	};

	$scope.versionChosen = function(version)
	{
		$scope.version = version;
		$http.get('/dates/'+$scope.timestamp+'/'+version).then(function(resp) {
			$scope.languages = resp.data;
		});
	};

	$scope.languageChosen = function(language)
	{
		$scope.language = language;
	};

	$scope.addToComparison = function()
	{
		$scope.toCompare.push({
			timestamp: $scope.timestamp,
			date: $scope.date,
			version: $scope.version,
			language: $scope.language
		});
	};

	$scope.moveComparedItem = function(pos, delta)
	{
		var new_pos = pos + delta;
		if ($scope.toCompare[pos] && $scope.toCompare[new_pos])
		{
			var tmp = $scope.toCompare[new_pos];
			$scope.toCompare[new_pos] = $scope.toCompare[pos];
			$scope.toCompare[pos] = tmp;
		}
	};

	$scope.removeComparedItem = function(pos)
	{
		$scope.toCompare.splice(pos, 1);
	};

	$scope.runComparison = function()
	{
		$http
		.post('/compare', angular.toJson($scope.toCompare, true))
		.then(function(resp){
			
		});
	};
});
