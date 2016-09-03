(function() {
    "use strict";

    angular.module("TrytonApp.Loader")
        .directive("loader", LoaderDirective)

    function LoaderDirective(Loader) {
        return {
            restrict: "A",
            require: "loader",
            compile: function() {
                return {
                    pre: function(scope, elem, attrs, ctrl) {
                        //wrzuca do serwisu dane dotyczące tego loadera: 
                        //nazwa, element html, controller
                        Loader.put(attrs.loader, elem, ctrl);

                        //wysyla controllerowi ten element html, zeby mogl go uzywać
                        ctrl.setThisElement(elem);
                    },
                }
            },
            controller: function($compile, $scope) {
                var self = this;
                var angularTemplate;
                var angularErrorTemplate;
                var thisElem;
                this.setThisElement = function(elem) {
                    thisElem = elem;
                }

                //////////////////
                var isLoading = false;
                var isError = false;
                this.isLoading = function () {
                    return isLoading;
                }
                this.isError = function () {
                    return isError;
                }
                this.setLoading = function (bool) {
                    isLoading = !!bool;
                }
                this.setError = function (bool) {
                    isError = !!bool;
                }

                /////////////
                this.startLoading = function (template) {
                    this.setLoading(true);
                    this.unsetErrorState();
                    angularTemplate = angular.element($compile(template)($scope));
                    thisElem.append(angularTemplate);
                }
                this.stopLoading = function () {
                    if (angularTemplate) {
                        this.setLoading(false);
                        angularTemplate.remove();
                    }
                }
                this.setErrorState = function (errorTemplate) {
                    this.setError(true);
                    this.stopLoading();
                    angularErrorTemplate = angular.element($compile(errorTemplate)($scope));
                    thisElem.append(angularErrorTemplate);
                }
                this.unsetErrorState = function () {
                    if(angularErrorTemplate) {
                        this.setError(false);
                        angularErrorTemplate.remove();
                    }
                }

                // this.startLoading = function() {
                //     if (isLoading) {
                //         return;
                //     }
                //     isLoading = true;

                //     self.unsetErrorState();
                //     angularTemplate = angular.element($compile(template)($scope));

                //     self.selectedElement.append(angularTemplate);
                // }
                // this.stopLoading = function() {
                //     if (angularTemplate) {
                //         isLoading = false;
                //         angularTemplate.remove();
                //     }
                // }
                // this.setErrorState = function() {
                //     if(isError) {
                //         return;
                //     }
                //     isError = true;

                //     self.stopLoading();
                //     angularErrorTemplate = angular.element($compile(errorTemplate)($scope));

                //     self.selectedElement.append(angularErrorTemplate);
                // }
                // this.unsetErrorState = function() {
                //     if (angularErrorTemplate) {
                //         isError = false;
                //         angularErrorTemplate.remove();
                //     }
                // }
            }
        }
    }
})();
