(function () {
    "use strict";

    angular.module("TrytonApp.Router.App.Account.Password")
		.config(AccountConfig);

    function AccountConfig($stateProvider, ViewUrl) {
    	$stateProvider.state("app.account.password", {
    		url: "/password",
			templateUrl: ViewUrl + "account.password.html",
			controller: "AccountPasswordController",
			controllerAs: "ctrl"
		});
	}
})();