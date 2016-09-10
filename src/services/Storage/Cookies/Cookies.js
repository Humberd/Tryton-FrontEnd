(function() {
	"use strict";

	angular.module("TrytonApp.Storage.Cookies")
		.factory("Cookies", CookiesFactory);

	function CookiesFactory($cookies) {
		var interf = {
			get: function (varName) {
				return $cookies.getObject(varName);
			},
			set: function (varName, value, options) {
				$cookies.putObject(varName, value, options);
			},
			is: function (varName, value) {
				return $cookies.getObject(varName) === value;
			}
		};

		return interf;
	}
})();