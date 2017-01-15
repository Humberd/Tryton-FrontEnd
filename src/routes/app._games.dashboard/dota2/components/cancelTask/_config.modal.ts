(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard.cancelDota2Task")
		.config(Config);

	function Config(ModalProvider) {
		ModalProvider.registerModal("cancelDota2Task.html", "cancelDota2TaskController");
	}
})();