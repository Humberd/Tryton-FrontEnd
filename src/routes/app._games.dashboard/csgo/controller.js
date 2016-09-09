(function() {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard")
		.controller("CsgoController", CsgoController);

	function CsgoController($scope) {
		$scope.foo = "dupa";
	}
})();