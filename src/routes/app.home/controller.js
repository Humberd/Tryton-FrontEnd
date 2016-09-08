(function() {
	"use strict";

	angular.module("TrytonApp.Router.App.Home")
		.controller("AppHomeController", AppHomeController);

	function AppHomeController($scope, Loader, $interval) {
		$scope.dupa = "foo";
		$scope.flag = true;
		// Loader.startLoading("home.slides");
		// Loader.watchLoadingEventually("home.slides", "flag", $scope);
		// $interval(function () {
		// 	$scope.flag = !$scope.flag;
		// }, 3000);
		// Loader.startLoadingEventually("home.slides");
	}
})();