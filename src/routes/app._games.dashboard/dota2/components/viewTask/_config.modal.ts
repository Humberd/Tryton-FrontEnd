(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard.viewTaskDota2")
		.config(Config);

	function Config(ModalProvider) {
		ModalProvider.registerModal("viewTaskDota2.html", "viewTaskDota2Controller");
	}
})();