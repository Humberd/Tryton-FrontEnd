(function () {
	"use strict";

	angular.module("TrytonApp.Router.App.Account")
		.config(AccountConfig);

	function AccountConfig($stateProvider, ViewUrl, $urlRouterProvider) {
		$stateProvider.state("app.account", {
			abstract: true,
			url: "/account",
			templateUrl: ViewUrl + "account.html"
		});

		$urlRouterProvider.when("/account", function ($state) {
			$state.go("app.account.password");
		});
	}
})();