(function() {
    "use strict";

    angular.module("TrytonApp.Storage", ["TrytonApp.Storage.Cookies",
        "TrytonApp.Storage.LocalStorage", "TrytonApp.Storage.SessionStorage",
        "TrytonApp.Configs"
    ]);
})();
