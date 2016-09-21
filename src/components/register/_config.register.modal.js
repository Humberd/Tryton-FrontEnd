(function () {
    "use strict";

    angular.module("TrytonApp.Register")
		.config(Config);

	function Config(ModalProvider) {
		ModalProvider.registerModal("register.html", "registerController");
	}
})();