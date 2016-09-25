(function () {
	"use strict";

	angular.module("TrytonApp")
		.controller("indexController", IndexController);

	function IndexController($scope, ExpToast, $mdToast, $state, $timeout,
							 Loader, $interval, $rootScope) {
		$scope.click = function () {
			ExpToast.addTask(20);
		};

		$scope.timeout = function () {
			return $timeout(function () {
				console.log("finished");
			}, 2000);
		};
	}

})();
