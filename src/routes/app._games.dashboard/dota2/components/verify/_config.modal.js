(function () {
    "use strict";

    angular.module("TrytonApp.Router.App._games.Dashboard.dota2Verify")
		.config(Config);

    function Config(ModalProvider) {
    	ModalProvider.registerModal("verify_dota2.html", "dota2TaskVerifyController");
	}
})();