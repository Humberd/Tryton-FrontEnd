(function () {
    "use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard")
		.config(Config);

	function Config(ModalProvider) {
		ModalProvider.registerModal("dota2NewTask.html", "dota2NewTaskController");
	}
})();