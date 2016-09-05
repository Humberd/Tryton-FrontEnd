(function() {
    "use strict";

    angular.module("TrytonApp.Loader")
        .service("Loader", LoaderService);

    function LoaderService(Logger, $q, $rootScope) {
        var self = this;
        var list = {};

        this.put = function(loaderName, ctrl) {
            if (!angular.isString(loaderName) || loaderName.length === 0) {
                Logger.error("Name of the Loader cannot be empty");
                return;
            }
            if (list[loaderName]) {
                Logger.error("Duplicate name of the Loader: [%s]", loaderName);
                return;
            }

            list[loaderName] = {
                controller: ctrl
            };
        }
        this.remove = function(loaderName) {
            list[loaderName] = undefined;
        }
        this.getController = function(loaderName) {
            var loader = list[loaderName];
            if (loader) {
                return loader.controller;
            }
            throw "Loader doesn't exist";
        }
        this.isLoading = function(loaderName) {
            return this.getController(loaderName).isLoading();
        }
        this.isError = function(loaderName) {
            return this.getController(loaderName).isError();
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
                $q.when(promise).then(function() {
                    controller.stopLoading();
                }, function() {
                    controller.setErrorState();
                });
            }
        }
        this.stopLoading = function(loaderName) {
            var controller = this.getController(loaderName);

            controller.stopLoading();

        }
        this.watchLoading = function(loaderName, expression, scope) {
            this.getController(loaderName);
            if (!angular.isString(expression) && !angular.isFunction(expression)) {
                throw "Expression must be a string or a function";
            }
            if ($rootScope.$root !== scope.$root) {
                throw "Provided scope is invalid";
            }

            scope.$watch(expression, function(newVal) {
                if (newVal) {
                    self.startLoading(loaderName);
                } else {
                    self.stopLoading(loaderName);
                }
            });
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
