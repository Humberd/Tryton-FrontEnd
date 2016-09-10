(function() {
    "use strict";

    angular.module("TrytonApp.Storage.LocalStorage")
        .factory("LocalStorage", LocalStorageFactory);

    function LocalStorageFactory($localStorage) {
        var interf = {
            get: function(varName) {
                return $localStorage[varName];
            },
            set: function(varName, value) {
                $localStorage[varName] = value;
            },
            is: function(varName, value) {
                return $localStorage[varName] === value;
            }
        };

        return interf;
    }
})();
