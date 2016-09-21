(function () {
    "use strict";

    angular.module("TrytonApp.Login")
		.config(LoginConfig);

	function LoginConfig(ModalProvider) {
		ModalProvider.registerModal("login.html", "loginController");
	}
})();