(function() {
	"use strict";

	angular.module("TrytonApp.Router.App.Home")
		.controller("AppHomeController", AppHomeController);

	function AppHomeController($scope, Loader, $interval) {
		$scope.dupa = "foo";
		$scope.flag = true;
		// Loader.startLoading("home.slides");
		Loader.watchLoading("home.slides", "flag", $scope);
		$interval(function () {
			$scope.flag = !$scope.flag;
		}, 1000);
	}
})();