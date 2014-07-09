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
	//$scope.comparison = {"translations\/[lc]\/tabs.php":{"AdminEmails":{"message":"E-mail","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Adresse e-mail","was":"E-mail"}]},"AdminPreferences":{"message":"General","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"G\u00e9n\u00e9rale","was":"G\u00e9n\u00e9rales"}]}},"translations\/[lc]\/pdf.php":{"PDF3601146c4e948c32b6424d2c0a7f0118":{"message":"Price","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Prix","was":"Le prix"}]}},"translations\/[lc]\/admin.php":{"AdminAddresses77587239bf4c54ea493c7033e1dbf636":{"message":"Last Name","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Nom","was":"Name"}]},"AdminContactsb78a3223503896721cca1303f776159b":{"message":"Title","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Titre","was":"Titre de civilit\u00e9"}]},"AdminCustomerPreferences1f8261d17452a959e013666c5df45e07":{"message":"Phone number","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Num\u00e9ro de t\u00e9l\u00e9phone","was":"T\u00e9l\u00e9phone"}]},"AdminPreferences21084da7c0a49b229bd7f905e93d4aaa":{"message":"Lingerie and Adult","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Lingerie et Adulte","was":"Lingerie et produits pour adultes"}]},"AdminReferrers095a1b43effec73955e31e790438de49":{"message":"Base","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Base","was":"\u0080Base"}]},"AdminReferrers2e27c4006a026eacfc1f85b41bf9bc4c":{"message":"Base fee","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Commission de base","was":"Commission \u0080"}]},"AdminShipping3601146c4e948c32b6424d2c0a7f0118":{"message":"Price","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Prix","was":"Le prix"}]},"AdminModulesb1c94ca2fbc3e78fc30069c8d0f01680":{"message":"All","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Toutes","was":"Tous"}]},"AdminModules2cc1943d4c0b46bfcf503a75c44f988b":{"message":"Popular","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Populaires","was":"Produits Phares"}]},"AdminOrders3601146c4e948c32b6424d2c0a7f0118":{"message":"Price","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Prix","was":"Le prix"}]}},"install-dev\/langs\/[lc]\/install.php":{"translations\/menu_configure":{"message":"Store information","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Informations","was":"Informations de la boutique"}]}},"modules\/blockstore\/translations\/[lc].php":{"<{blockstore}prestashop>blockstore_b786bfc116ecf9a6d47ce1114ca6abb7":{"message":"This module needs to be hooked in a column, but your theme does not implement one.","diff":[{"version":"1.6.0.8","type":"LOST","translation":""}]},"<{blockstore}prestashop>blockstore_4d100d8b1b9bcb5a376f78365340cdbe":{"message":"Image for the Store Locator block","diff":[{"version":"1.6.0.8","type":"LOST","translation":""}]},"<{blockstore}prestashop>blockstore_a34202cc413553fe0fe2d46f706db435":{"message":"Text for the Store Locator block","diff":[{"version":"1.6.0.8","type":"LOST","translation":""}]}},"modules\/themeconfigurator\/translations\/[lc].php":{"<{themeconfigurator}prestashop>new_b78a3223503896721cca1303f776159b":{"message":"Title","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Titre","was":"Titre de civilit\u00e9"}]}},"modules\/carriercompare\/translations\/[lc].php":{"<{carriercompare}prestashop>carriercompare_3601146c4e948c32b6424d2c0a7f0118":{"message":"Price","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Prix","was":"Le prix"}]}},"modules\/followup\/translations\/[lc].php":{"<{followup}prestashop>stats_019d1ca7d50cc54b995f60d456435e87":{"message":"Used","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Utilis\u00e9","was":"Utilis\u00e9es"}]}},"modules\/blockadvertising\/translations\/[lc].php":{"<{blockadvertising}prestashop>blockadvertising_b15e7271053fe9dd22d80db100179085":{"message":"This module need to be hooked in a column and your theme does not implement one","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Ce module n\u00e9cessite d'\u00eatre greff\u00e9 sur une colonne, mais votre th\u00e8me n'a pas de colonne.","was":"Ce module n\u00e9cessite d'\u00eatre greff\u00e9 sur une colonne, mais votre th\u00e8me n'a pas de colonne"}]}},"modules\/autoupgrade\/translations\/[lc].php":{"<{autoupgrade}prestashop>adminpreferences_6adf97f83acf6453d4a6a4b1070f3754":{"message":"None","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"aucun","was":"Aucun"}]},"<{autoupgrade}prestashop>adminpreferences_19f823c6453c2b1ffd09cb715214813d":{"message":"Required field","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Champ requis","was":"Champs requis"}]},"<{autoupgrade}prestashop>adminselftab_2df9f8b8654e79c091ab5f33c9e1b67b":{"message":"Upload successful","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Mise en ligne r\u00e9ussie","was":"Envoi r\u00e9ussi"}]},"<{autoupgrade}prestashop>adminselftab_19f823c6453c2b1ffd09cb715214813d":{"message":"Required field","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Champ requis","was":"Champs requis"}]},"<{autoupgrade}prestashop>adminselftab_81f32b96f6626b8968e6a0f4a9bce62e":{"message":"Select the fields you would like to be required for this section.","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"S\u00e9lectionnez les champs que vous voulez rendre obligatoires pour cette section.","was":"S\u00e9lectionnez les champs requis pour cette section."}]},"<{autoupgrade}prestashop>adminselftab_e25f0ecd41211b01c83e5fec41df4fe7":{"message":"Delete selected items?","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Supprimer les \u00e9l\u00e9ments s\u00e9lectionn\u00e9s ?","was":"Supprimer la s\u00e9lection ?"}]},"<{autoupgrade}prestashop>adminselfupgrade_19f823c6453c2b1ffd09cb715214813d":{"message":"Required field","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Champ requis","was":"Champs requis"}]}},"modules\/productpaymentlogos\/translations\/[lc].php":{"<{productpaymentlogos}prestashop>productpaymentlogos_89ca5c48bbc6b7a648a5c1996767484c":{"message":"Block image","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Image du bloc","was":"Image"}]}},"modules\/homeslider\/translations\/[lc].php":{"<{homeslider}prestashop>homeslider_e6b391a8d2c4d45902a23a8b6585703d":{"message":"URL","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Site web","was":"URL"}]}},"modules\/statsproduct\/translations\/[lc].php":{"<{statsproduct}prestashop>statsproduct_3601146c4e948c32b6424d2c0a7f0118":{"message":"Price","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Prix","was":"Le prix"}]}},"modules\/emailgenerator\/templates_translations\/[lc]\/lang_content.php":{"Products":{"message":"Products","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Produits","was":"produits"}]}},"themes\/default-bootstrap\/lang\/[lc].php":{"product_019d1ca7d50cc54b995f60d456435e87":{"message":"Used","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Utilis\u00e9","was":"Occasion"}]},"product_3601146c4e948c32b6424d2c0a7f0118":{"message":"Price","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Prix","was":"Le prix"}]},"product_801ab24683a4a8c433c6eb40c48bcd9d":{"message":"Download","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"T\u00e9l\u00e9chargement","was":"T\u00e9l\u00e9charger"}]},"product_f787618e514c038851726224d7e4421e":{"message":"No file selected","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"aucun fichier selectionn\u00e9","was":"Aucun fichier s\u00e9lectionn\u00e9"}]},"product_e635032a5f71d809146d3872389f5b0c":{"message":"Choose File","diff":[{"version":"1.6.0.8","type":"CHANGED","translation":"Choisir un Fichier","was":"Choisir un fichier"}]}}};
	$scope.files_to_show = {};


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
			$scope.comparison = resp.data;
		});
	};

	$scope.count = function(obj)
	{
		if (Object.prototype.toString.call(obj) === '[object Array]')
			return obj.length;
		else
			return Object.keys(obj).length;
	}
});
