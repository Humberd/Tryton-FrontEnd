angular.module("TrytonApp.Router", ["ui.router", "permission", "permission.ui"])
    .config(RouterConfig);

function RouterConfig($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

}
