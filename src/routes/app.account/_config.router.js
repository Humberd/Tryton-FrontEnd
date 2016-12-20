(function () {
	"use strict";

	angular.module("TrytonApp.Router.App.Account")
		.config(AccountConfig);

	function AccountConfig($stateProvider, ViewUrl) {
		$stateProvider.state("app.account", {
			abstract: true,
			url: "/account",
			templateUrl: ViewUrl + "account.html"
		});
	}
})();