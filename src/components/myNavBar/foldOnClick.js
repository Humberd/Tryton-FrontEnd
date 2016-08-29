(function() {
    "use strict";

    angular.module("TrytonApp")
        .directive("foldOnClick", FoldOnClick);

    function FoldOnClick() {
        return {
            restrict: "A",
            scope: false,
            link: function(scope, elem, attrs) {
                if (angular.isFunction(scope.foldOnClick)) {
                    elem.on("click", function(event) {
                    	scope.foldOnClick();
                    });
                }
            }
        }
    }
})();
