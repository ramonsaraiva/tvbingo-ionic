
var controllers = angular.module('controllers', []);

controllers.controller('home_controller', function($scope, $http, $state, CardService, $ionicLoading, $ionicPopup, $cordovaBarcodeScanner) {
	$scope.bingo = {};

	$scope.qr = function()
	{
		$cordovaBarcodeScanner.scan().then(function(data) {
			if (!data.cancelled)
			{
				$scope.bingo.code = data.text;
				$scope.join();
			}
		}, function(error) {
			$ionicPopup.alert({
				title: 'Error reading the QR code'
			});
		});
	};

	$scope.join = function()
	{
		if (!$scope.bingo.code)
		{
			return;
		}

		$ionicLoading.show({template: 'Joining bingo..'});

		$http.post('http://jsrepre.org:8090/matches/cards/', $scope.bingo)
			.success(function(data) {
				$ionicLoading.hide();
				CardService.store_card(data);
				$state.transitionTo('tab.bingo', null, {reload:true, notify:true});
			})
			.error(function(e) {
				$ionicLoading.hide();
				$ionicPopup.alert({
					title: 'Bingo is full or not found!'
				});
			});
	};
});

controllers.controller('bingo_controller', function($scope, $state, $ionicLoading, CardService) {
	$scope.card = CardService.take_card();
	$scope.lines = CardService.get_lines();

	$scope.card_value = function(line, index)
	{
		return line[index+1];
	}
});
