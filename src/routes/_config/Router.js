angular.module("TrytonApp.Router", ["ui.router", "permission", "permission.ui"])
    .config(RouterConfig);

function RouterConfig($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider.state("one", {
        url: "/one",
        template: "this is one",
        views: {
            "viewA": { template: "one A" },
            "viewB": { template: "one B" }
        }
    });

    $stateProvider.state("two", {
        url: "/two",
        template: "TWOO"
    });
}
