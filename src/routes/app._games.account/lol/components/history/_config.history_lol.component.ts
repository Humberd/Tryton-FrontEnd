import {HistoryController} from "./history_lol.component.controller";
(function () {
    "use strict";

    angular.module("TrytonApp.Router.App._games.Account")
		.component("lolAccountHistory", Config());

	function Config() {
    	return {
    		controller: HistoryController,
			controllerAs: "ctrl",
			templateUrl: (ViewUrl) => {
    			return ViewUrl + "history_lol.component.html";
			}
		}
	}
})();