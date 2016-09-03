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
                        var loaderName = attrs.loader;
                        //wrzuca do serwisu dane dotyczące tego loadera: 
                        //nazwa, element html, controller
                        Loader.put(loaderName, elem, ctrl);

                        //wysyla controllerowi ten element html, zeby mogl go uzywać
                        ctrl.setThisElement(elem);

                        scope.$on("$destroy", function() {
                            Loader.remove(loaderName);
                        })
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
                this.isLoading = function() {
                    return isLoading;
                }
                this.isError = function() {
                    return isError;
                }
                this.setLoading = function(bool) {
                    isLoading = !!bool;
                }
                this.setError = function(bool) {
                    isError = !!bool;
                }

                /////////////
                this.startLoading = function(template) {
                    this.setLoading(true);
                    this.unsetErrorState();
                    angularTemplate = angular.element($compile(template)($scope));
                    thisElem.append(angularTemplate);
                }
                this.stopLoading = function() {
                    if (angularTemplate) {
                        this.setLoading(false);
                        angularTemplate.remove();
                    }
                }
                this.setErrorState = function(errorTemplate) {
                    this.setError(true);
                    this.stopLoading();
                    angularErrorTemplate = angular.element($compile(errorTemplate)($scope));
                    thisElem.append(angularErrorTemplate);
                }
                this.unsetErrorState = function() {
                    if (angularErrorTemplate) {
                        this.setError(false);
                        angularErrorTemplate.remove();
                    }
                }
            }
        }
    }
})();
