import {DisconnectedLolController} from "./disconnected_lol.component";
(function () {
    "use strict";

	angular.module("TrytonApp.Router.App._games.Account")
		.component("disconnectedLolAccount", DisconnectedLolConfig());

	function DisconnectedLolConfig() {
		return {
			controller: DisconnectedLolController,
			controllerAs: "ctrl",
			templateUrl: (ViewUrl) => {
				return ViewUrl + "disconnected_lol.component.html";
			},
			bindings: {
				getLolAccount: "&",
				connectLolAccountLocal: "&"
			}
		}
	}
})();