(function() {
    "use strict";

    angular.module("TrytonApp.Loader")
        .directive("loaderClick", LoaderClickDirective)

    function LoaderClickDirective($timeout, $parse) {
        return {
            restrict: "EA",
            require: "^loader",
            priority: -5,
            compile: function() {
                return {
                    post: function(scope, elem, attrs, ctrl) {
                        //daje znac loaderowi, ktory loader ma uzywac
                        ctrl.selectElement(attrs.loaderClick);

                        elem.on("click", function(event) {
                            //jesli obok jest dyrektywa ng-click, to zatrzymuje jej działanie
                            stopInvoke(event);

                            //jesli wybrany loader jest w trakcie ladowania, to nie laduje ponownie
                            if (ctrl.isLoadingState()) {
                                return;
                            }

                            ctrl.startLoading();
                            try {
                                //odpala funkcję zdefiniowaną w ng-click
                                //musi byc promisem
                                resumeInvoke().then(function() {
                                    ctrl.stopLoading();
                                }, function() {
                                    ctrl.setErrorState();
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
