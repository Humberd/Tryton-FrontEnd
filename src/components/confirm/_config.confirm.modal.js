(function () {
    "use strict";

    angular.module("TrytonApp.Confirm")
		.config(Config);

	function Config(ModalProvider) {
		ModalProvider.registerModal("confirm.html", "confirmController");
	}
})();