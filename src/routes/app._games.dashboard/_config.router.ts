(function() {
    "use strict";

    angular.module("TrytonApp.Router.App._games.Dashboard")
        .config(AppGamesDashboardConfig);

    function AppGamesDashboardConfig($stateProvider) {
    	$stateProvider.state("app._games.dashboard", {
    		url: "/:game/dashboard",
			controllerAs: "ctrl",
			data: {
    			permissions: {
    				only: "VERIFIED-ACCOUNT",
					redirectTo: "app._games.account"
				}
			}
    	});
    }
})();
