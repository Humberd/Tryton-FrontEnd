(function() {
	"use strict";

	angular.module("TrytonApp.Router.App.Home")
		.controller("AppHomeController", AppHomeController);

	function AppHomeController($scope) {
		$scope.dupa = "foo"
	}
})();