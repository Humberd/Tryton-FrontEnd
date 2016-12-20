class PasswordController {
	foo = "dupa";
}

(function () {
    "use strict";

    angular.module("TrytonApp.Router.App.Account.Password")
		.controller("AccountPasswordController", PasswordController)
})();