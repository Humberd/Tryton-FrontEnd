(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games")
		.config(GamesDecoratorConfig);

	function GamesDecoratorConfig($stateProvider, ViewUrl) {

		/*
		 State decorator działa w ten sposób, że jako parametr pierwszy
		 podaję nazwę pola, które chcę nadpisać, które ustaliłem wcześniej
		 przy deklarowaniu $stateProvider.state();
		 Funkcję w parametrze drugim wywoła tyle razy, ile statów zadeklarowałem.
		 Zwrócić trzeba wartość, która nadpisze element ustalony w parametrze pierwszym
		 */
		$stateProvider.decorator("templateUrl", function (state, parent) {
			//ustalać będę tylko dla tych elementów, które dziedziczą z app._games
			if (includes(state, "app._games") && state.name !== "app._games") {
				//wydobywam nazwę tego statu, czyli, np. dashboard zamiast app._games.dashboard
				var dottedNames = state.self.name.split(".");
				var lastStateName = dottedNames[dottedNames.length - 1];

				var templateUrl = function ($stateParams) {
					return ViewUrl + lastStateName + "_" + $stateParams.game + ".html";
				};
				return templateUrl;
			} else {
				return state.self.templateUrl;
			}
		});
		$stateProvider.decorator("controllerProvider", function (state, parent) {
			if (includes(state, "app._games") && state.name !== "app._games") {
				var dottedNames = state.self.name.split(".");
				var lastStateName = dottedNames[dottedNames.length - 1];

				var controllerProvider = function ($stateParams) {
					return lastStateName + "_" + $stateParams.game + ".controller";
				};
				return controllerProvider;
			} else {
				return state.self.controllerProvider;
			}
		});

		//w tej fazie nie istnieje jeszcze pole includes, dlatego muszę ręcznie sprawdzić,
		//czy w nazwie statu jest szukany rodzic
		function includes(toState, stateName) {
			return toState.name.search(stateName) >= 0;
		}
	}
})();
