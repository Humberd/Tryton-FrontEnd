import {AppHomeController} from "./controller";
(function() {
    "use strict";

    angular.module("TrytonApp.Router.App.Home")
        .config(HomeConfig);

    function HomeConfig($stateProvider, $urlRouterProvider, ViewUrl) {
        $stateProvider.state("app.home", {
        	url: "/",
            templateUrl: ViewUrl + "home.html",
            controller: AppHomeController,
            controllerAs: "ctrl"
        });

        $urlRouterProvider.when("/home", function ($state) {
        	$state.go("app.home");
        });
    }
})();
