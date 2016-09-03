(function() {
    "use strict";

    angular.module("TrytonApp.Loader")
        .directive("loader", LoaderDirective)

    function LoaderDirective(Loader) {
        var list = {};
        return {
            restrict: "A",
            require: "loader",
            compile: function() {
                return {
                    pre: function(scope, elem, attrs, ctrl) {
                        Loader.put(attrs.loader, elem, ctrl);

                        ctrl.setThisElement(elem);
                    },
                }
            },
            controller: function($compile, $scope) {
                var self = this;
                var template = "<loader-templates-loading></loader-templates-loading>";
                var errorTemplate = "<loader-templates-error></loader-templates-error>";
                var angularTemplate;
                var angularErrorTemplate;

                this.setThisElement = function(elem) {
                    self.thisElem = elem;
                }
                this.selectElement = function(loaderName) {
                    self.selectedElement;

                    if (angular.isString(loaderName)) {
                        self.selectedElement = Loader.get(loaderName);
                    } else {
                        console.log(self.thisElem);
                        self.selectedElement = self.thisElem;
                    }
                }

                //////////////////
                var isLoading = false;
                var isError = false;
                this.startLoading = function() {
                    if (isLoading) {
                        return;
                    }
                    isLoading = true;

                    self.unsetErrorState();
                    angularTemplate = angular.element($compile(template)($scope));

                    self.selectedElement.append(angularTemplate);
                }
                this.stopLoading = function() {
                    if (angularTemplate) {
                        isLoading = false;
                        angularTemplate.remove();
                    }
                }
                this.setErrorState = function() {
                    if(isError) {
                        return;
                    }
                    isError = true;

                    self.stopLoading();
                    angularErrorTemplate = angular.element($compile(errorTemplate)($scope));

                    self.selectedElement.append(angularErrorTemplate);
                }
                this.unsetErrorState = function() {
                    if (angularErrorTemplate) {
                        isError = false;
                        angularErrorTemplate.remove();
                    }
                }

                /////////////
                this.isErrorState = function () {
                    return isError;
                }
                this.isLoadingState = function () {
                    return isLoading;
                }

            }
        }
    }
})();
