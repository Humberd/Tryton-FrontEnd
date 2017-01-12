import {Dota2DisconnectedComponent} from "./disconnected_dota2.component.controller";
(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Account")
		.component("disconnectedDota2Account", DisconnectedLolConfig());

	function DisconnectedLolConfig() {
		return {
			controller: Dota2DisconnectedComponent,
			controllerAs: "ctrl",
			templateUrl: (ViewUrl) => {
				return ViewUrl + "disconnected_dota2.component.html";
			},
			bindings: {
				methods: "<"
			}
		}
	}
})();