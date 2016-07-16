(function() {
    "use strict";

    angular.module("TrytonApp")
        .directive("userNavBar", UserNavBar)

    function UserNavBar(ViewUrl) {
        return {
            restrict: "A",
            templateUrl: ViewUrl + "userNavBar.html",
            controller: "userNavBarController"
        };
    }
})();
