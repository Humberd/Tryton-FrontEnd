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
                        ctrl.selectElement(attrs.loaderClick);

                        elem.on("click", function(event) {
                            stopInvoke(event);

                            if (ctrl.isLoadingState()) {
                                return;
                            }

                            ctrl.startLoading();
                            try {
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
                        // console.log(ctrl[1]);
                    },
                }
            }
        }
    }
})();
