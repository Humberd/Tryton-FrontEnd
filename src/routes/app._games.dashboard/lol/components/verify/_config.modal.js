(function () {
    "use strict";

    angular.module("TrytonApp.Router.App._games.Dashboard.verify")
		.config(Config);

    function Config(ModalProvider) {
		ModalProvider.registerModal("verify.html", "lolTaskVerifyController");
	}
})();