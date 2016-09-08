(function() {
    "use strict";

    angular.module("TrytonApp.Router.App._games.Dashboard")
        .config(AppGamesDashboardConfig);

    function AppGamesDashboardConfig($stateProvider) {
    	$stateProvider.state("dashboard", {
    		parent: "app._games",
    		url: "/:game/dashboard",
    		template: "<div>dashboard</div>"
    	})
    }
})();
