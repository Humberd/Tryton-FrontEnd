(function () {
    "use strict";
    
    angular.module("TrytonApp.Router.App._games.Profile")
		.config(Config);

	function Config($stateProvider) {
    	$stateProvider.state("app._games.profile", {
    		url: "/:game/profile",
			controllerAs: "ctrl"
		})
	}
})();