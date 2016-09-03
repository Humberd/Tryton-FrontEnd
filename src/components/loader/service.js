(function() {
    "use strict";

    angular.module("TrytonApp.Loader")
        .service("Loader", LoaderService);

    function LoaderService(Logger) {
        var list = {};

        this.put = function(loaderName, elem, ctrl) {
            if (!list[loaderName]) {
                list[loaderName] = {
                    element: elem,
                    controller: ctrl
                };
            } else {
                Logger.error("Duplicate name of the Loader: [%s]", loaderName);
            }
        }
        this.get = function(loaderName) {
            return list[loaderName].element;
        }
        this.startLoading = function(loaderName) {
            invokeCtrl(loaderName, "startLoading");
        }
        this.stopLoading = function(loaderName) {
        	invokeCtrl(loaderName, "stopLoading");
        }
        this.setErrorState = function (loaderName) {
        	invokeCtrl(loaderName, "setErrorState");
        }
        this.unsetErrorState = function (loaderName) {
        	invokeCtrl(loaderName, "unsetErrorState");
        }
        function invokeCtrl(loaderName, methodName) {
            try {
                list[loaderName].controller[methodName]();
            } catch (err) {
                Logger.error("Loader: [%s] doesn't exist", loaderName);
            }
        }

    }
})();
