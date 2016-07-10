angular.module("TrytonApp.Router", ["ui.router"])
    .config(RouterConfig);

function RouterConfig($stateProvider, $urlRouterProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	$stateProvider.state("one", {
		url: "/one",
		template: "this is one"
	});

	$stateProvider.state("two", {
		url: "/two",
		template: "TWOO"
	});
}
