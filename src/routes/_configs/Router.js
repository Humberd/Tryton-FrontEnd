(function() {
    "use strict";

    angular.module("TrytonApp.Router")
        .config(RouterConfig);

    function RouterConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
    }
})();
