(function () {
    "use strict";

    angular.module("TrytonApp.Router.App._games.Dashboard.viewTaskLol")
		.config(Config);

    function Config(ModalProvider) {
		ModalProvider.registerModal("viewTaskLol.html", "viewTaskLolController");
	}
})();