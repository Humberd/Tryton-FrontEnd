(function() {
    "use strict";

    angular.module("TrytonApp.Loader")
        .directive("loaderClick", LoaderClickDirective)

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
                                throw new "ng click must return promise";
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
