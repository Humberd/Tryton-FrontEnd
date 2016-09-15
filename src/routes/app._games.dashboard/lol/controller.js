(function() {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard")
		.controller("LolController", LolController);

	function LolController(Modal) {
		Modal.show.newTask();
	}
})();