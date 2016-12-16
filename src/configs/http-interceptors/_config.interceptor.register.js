(function () {
    "use strict";

    angular.module("TrytonApp.Configs.HttpInterceptors")
		.config(Config);

    function Config($httpProvider) {
    	$httpProvider.interceptors.push("addUserTokenToRequest");
	}
})();