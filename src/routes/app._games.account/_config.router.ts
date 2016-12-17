(function () {
    "use strict";

    angular.module("TrytonApp.Router.App._games.Account")
		.config(Config);

    function Config($stateProvider) {
    	$stateProvider.state("app._games.account", {
    		url: "/:game/account",
			controllerAs: "ctrl"
		})
	}
})();