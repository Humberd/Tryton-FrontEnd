(function() {
    "use strict";

    angular.module("TrytonApp.Loader")
        .service("Loader", LoaderService);

    function LoaderService(Logger, $q) {
    	var self = this;
        var list = {};

        this.put = function(loaderName, elem, ctrl) {
            if (!angular.isString(loaderName) || loaderName.length === 0) {
                Logger.error("Name of the Loader cannot be ampty");
                return;
            }
            if (list[loaderName]) {
                Logger.error("Duplicate name of the Loader: [%s]", loaderName);
                return;
            }

            list[loaderName] = {
                element: elem,
                controller: ctrl
            };
        }
        this.getElement = function(loaderName) {
            return list[loaderName].element;
        }
        this.getController = function(loaderName) {
            return list[loaderName].controller;
        }
        this.isLoading = function (loaderName) {
        	return this.getController(loaderName).isLoading();
        }

        ///////////////////
        var template = "<loader-templates-loading></loader-templates-loading>";
        var errorTemplate = "<loader-templates-error></loader-templates-error>";

        this.startLoading = function(loaderName, promise) {
            var controller = this.getController(loaderName);

            if (controller.isLoading()) {
                return;
            }
            controller.startLoading(template);
            if (promise) {
            	$q.when(promise).then(function () {
            		controller.stopLoading();
            	})
            }
        }
        this.stopLoading = function(loaderName) {
            var controller = this.getController(loaderName);

            controller.stopLoading();

        }
        this.setErrorState = function(loaderName) {
            var controller = this.getController(loaderName);

            if (controller.isError()) {
            	return;
            }

            controller.setErrorState(errorTemplate);
        }
        this.unsetErrorState = function(loaderName) {
            var controller = this.getController(loaderName);

            controller.unsetErrorState();
        }
    }
})();
