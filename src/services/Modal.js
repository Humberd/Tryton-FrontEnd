(function() {
    "use strict";

    angular.module("TrytonApp.Modal", [])
        .service("Modal", Modal);

    function Modal($uibModal, ViewUrl, Logger, $mdDialog) {
        this.show = {};
        var modals = {
            "login.html": "loginController",
            "register.html": "registerController"
        }
        parseModalsToShowMethods.call(this);

        function ModalFunction(htmlFile, controller, resolvers) {
            if (!angular.isString(htmlFile)) {
                Logger.warning("[%o] must be a 'htmlFile' string value, but instead is [%s]", htmlFile, typeof(htmlFile));
                return;
            } else if (!angular.isString(controller)) {
                Logger.warning("[%o] must be a 'controller' string value, but instead is [%s]", controller, typeof(controller));
                return;
            } else if (angular.isDefined(resolvers) && !angular.isObject(resolvers)) {
                Logger.warning("[%o] must be a 'resolvers' object type, but instead is [%s]", resolvers, typeof(resolvers));
                return;
            }
            return $mdDialog.show({
                templateUrl: ViewUrl + htmlFile,
                clickOutsideToClose: true,
                escapeToClose: true,
                controller: controller,
                resolve: resolvers
            });
        };

        function parseModalsToShowMethods() {
            var show = this.show;
            for (var m in modals) {
                var keyNoExtension = m.split(".")[0];
                setMethod(keyNoExtension, m, modals[m]);
            }
            function setMethod(key, htmlFile, controller) {
                show[key] = function (resolvers) {
                    return ModalFunction(htmlFile, controller, resolvers);
                }
            }
        }
    }
})();
