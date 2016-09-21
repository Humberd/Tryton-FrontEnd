(function() {
    "use strict";

    angular.module("TrytonApp.Router.App._games")
        .config(AppGamesConfig)

    function AppGamesConfig($stateProvider) {
        $stateProvider.state("app._games", {
            abstract: true,
            template: "<div ui-view></div>"
        });
    }
})();
