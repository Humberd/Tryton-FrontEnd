(function() {
    "use strict";

    angular.module("TrytonApp.Router.App")
        .directive("foldOnClick", FoldOnClick);

    function FoldOnClick() {
        return {
            restrict: "A",
            scope: false,
            link: function(scope, elem, attrs) {
                if (angular.isFunction(scope.foldOnClick)) {
                    elem.on("click", function(event) {
                        if (!elem.hasClass("selected")) {
                            scope.foldOnClick();
                        }
                    });
                }
            }
        }
    }
})();
