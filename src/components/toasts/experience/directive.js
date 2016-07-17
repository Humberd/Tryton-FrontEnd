(function() {
    "use strict";

    angular.module("TrytonApp.Toasts")
        .directive("expToast", ExpToastDirective);

    function ExpToastDirective(ViewUrl) {
        return {
            restrict: "E",
            templateUrl: ViewUrl + "expToast.html",
            replace: true,
            link: function(scope, elem, attrs) {

            }
        }
    }

})();
