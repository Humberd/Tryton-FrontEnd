(function() {
    "use strict";

    angular.module("TrytonApp.Loader")
        .directive("loader", LoaderDirective);
    /**
     * <div loader="myLoader">
     *      **Some content**
     * </div>
     * @param {string} loader - define the name of the loader for this component
     */
    function LoaderDirective(Loader) {
        return {
            restrict: "A",
            require: "loader",
            compile: function() {
                return {
                    pre: function(scope, elem, attrs, ctrl) {
                        var loaderName = attrs.loader;

                        elem.addClass("loader-base");

                        //tworze wrapper, w ktorym bedzie siedziec error albo loading
                        var wrapper = angular.element("<div></div>");
                        wrapper.addClass("loader-wrapper");
                        wrapper.addClass("loader-hide");
                        elem.append(wrapper);
                        ctrl.setWrapper(wrapper);

                        //wrzuca do serwisu dane dotyczące tego loadera: 
                        //nazwa, element html, controller
                        Loader.put(loaderName, ctrl);

                        //przy usunieciu loadera usuwam go z listy dostepnych loaderow
                        scope.$on("$destroy", function() {
                            Loader.remove(loaderName);
                        });
                    }
                };
            },
            controller: function($compile, $scope) {
                var angularTemplate;
                var angularErrorTemplate;
                var wrapper;
                this.setWrapper = function(elem) {
                    wrapper = elem;
                };

                //////////////////
                var isLoading = false;
                var isError = false;
                this.isLoading = function() {
                    return isLoading;
                };
                this.isError = function() {
                    return isError;
                };
                this.setLoading = function(bool) {
                    isLoading = !!bool;
                };
                this.setError = function(bool) {
                    isError = !!bool;
                };

                /////////////
                this.startLoading = function(template) {
                    this.setLoading(true);
                    this.unsetErrorState();
                    angularTemplate = angular.element($compile(template)($scope));
                    wrapper.append(angularTemplate);
                    showWrapper();
                };
                this.stopLoading = function() {
                    if (angularTemplate) {
                        this.setLoading(false);
                        angularTemplate.remove();
                        hideWrapper();
                    }
                };
                this.setErrorState = function(errorTemplate) {
                    this.setError(true);
                    this.stopLoading();
                    angularErrorTemplate = angular.element($compile(errorTemplate)($scope));
                    wrapper.append(angularErrorTemplate);
                    showWrapper();
                };
                this.unsetErrorState = function() {
                    if (angularErrorTemplate) {
                        this.setError(false);
                        angularErrorTemplate.remove();
                        hideWrapper();
                    }
                };
                function showWrapper() {
                    wrapper.removeClass("loader-hide");
                }
                function hideWrapper() {
                    wrapper.addClass("loader-hide");
                }
            }
        }
    }
})();
