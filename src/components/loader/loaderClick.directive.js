(function() {
    "use strict";

    angular.module("TrytonApp.Loader")
        .directive("loaderClick", LoaderClickDirective)
    /**
     * Before invoking the function inside ng-click it will start Loader
     * which name is defined as param.
     * After the promise is resolved it will stop the Loader
     *
     * <button loader-click="myLoader" ng-click="foo()">Delete</button>
     *
     * @param {string} loader-click - name of the loader
     */
    function LoaderClickDirective($timeout, $parse, Loader) {
        return {
            restrict: "EA",
            priority: -5,
            compile: function() {
                return {
                    post: function(scope, elem, attrs) {
                        var loaderName = attrs.loaderClick;

                        elem.on("click", function(event) {
                            //jesli obok jest dyrektywa ng-click, to zatrzymuje jej działanie
                            stopInvoke(event);

                            //jesli wybrany loader jest w trakcie ladowania, to nie laduje ponownie
                            if (Loader.isLoading(loaderName)) {
                                return;
                            }

                            Loader.startLoading(loaderName);
                            try {
                                //odpala funkcję zdefiniowaną w ng-click
                                //musi byc promisem
                                resumeInvoke().then(function() {
                                    Loader.stopLoading(loaderName);
                                }, function() {
                                    Loader.setErrorState(loaderName);
                                })
                            } catch (err) {
                                throw "ng click must return promise";
                            }
                        });

                        function stopInvoke(event) {
                            event.stopImmediatePropagation();
                        }

                        function resumeInvoke() {
                            return $parse(attrs.ngClick)(scope);
                        }
                    }
                }
            }
        }
    }
})();
