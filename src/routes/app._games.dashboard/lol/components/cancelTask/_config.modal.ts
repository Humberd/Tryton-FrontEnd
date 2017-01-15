(function () {
    "use strict";

    angular.module("TrytonApp.Router.App._games.Dashboard.cancelLolTask")
        .config(Config);

    function Config(ModalProvider) {
        ModalProvider.registerModal("cancelLolTask.html", "cancelLolTaskController");
    }
})();