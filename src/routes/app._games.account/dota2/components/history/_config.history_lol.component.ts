import {Dota2HistoryController} from "./history_dota2.component.controller";
(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Account")
		.component("dota2AccountHistory", Config());

	function Config() {
		return {
			controller: Dota2HistoryController,
			controllerAs: "ctrl",
			templateUrl: (ViewUrl) => {
				return ViewUrl + "history_dota2.component.html";
			}
		}
	}
})();