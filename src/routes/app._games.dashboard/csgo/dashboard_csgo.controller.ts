(function() {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard")
		.controller("dashboard_csgo.controller", CsgoController);

	function CsgoController($scope) {
		$scope.foo = "dupa";
	}
})();