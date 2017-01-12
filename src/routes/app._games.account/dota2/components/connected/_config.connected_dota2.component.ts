import {Dota2ConnectedComponent} from "./connected_dota2.component.controller";
(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Account")
		.component("connectedDota2Account", ConnectedLolConfig());

	function ConnectedLolConfig() {
		return {
			controller: Dota2ConnectedComponent,
			controllerAs: "ctrl",
			templateUrl: (ViewUrl) => {
				return ViewUrl + "connected_dota2.component.html";
			},
			bindings: {
				methods: "<"
			}
		}
	}
})();