(function() {
	"use strict";

	angular.module("TrytonApp.Storage.SessionStorage")
		.factory("SessionStorage", SessionStorageFactory);

	function SessionStorageFactory($sessionStorage) {
		var interf = {
            get: function(varName) {
                return $sessionStorage[varName];
            },
            set: function(varName, value) {
                $sessionStorage[varName] = value;
            },
            is: function(varName, value) {
                return $sessionStorage[varName] === value;
            }
        };

        return interf;
	}
})();