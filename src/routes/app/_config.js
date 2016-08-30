(function() {
	"use strict";

	angular.module("TrytonApp.Router.App")
		.config(AppConfig);

	function AppConfig($stateProvider, $urlRouterProvider, ViewUrl) {
		$stateProvider.state("app", {
			abstract: true,
			templateUrl: ViewUrl + "app.html"
		});
	}
})();