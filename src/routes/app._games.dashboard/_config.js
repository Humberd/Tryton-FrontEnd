(function() {
    "use strict";

    angular.module("TrytonApp.Router.App._games.Dashboard")
        .config(AppGamesDashboardConfig);

    function AppGamesDashboardConfig($stateProvider) {
    	$stateProvider.state("app._games.dashboard", {
    		url: "/:game/dashboard",
    		template: "<div>dashboard</div>"
    	})
    }
})();
