import {ConnectedLolController} from "./connected_lol.component.controller";

(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Account")
		.component("connectedLolAccount", ConnectedLolConfig());

	function ConnectedLolConfig() {
		return {
			controller: ConnectedLolController,
			controllerAs: "ctrl",
			templateUrl: (ViewUrl) => {
				return ViewUrl + "connected_lol.component.html";
			},
			bindings: {
				getLolAccount: "&",
				disconnectLolAccountLocal: "&"
			}
		}
	}
})();