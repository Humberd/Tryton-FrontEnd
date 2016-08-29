(function() {
    "use strict";

    angular.module("TrytonApp.Directives")
        .directive("bcgImage", BcgImage);

    function BcgImage() {
        return {
            restrict: "A",
            scope: {
                bcgImage: "="
            },
            link: function(scope, elem, attrs) {
                scope.$watch("bcgImage", function(newVal) {
                    if (angular.isString(newVal)) {
                    	changeImage(newVal);
                    }
                })

                function changeImage(src) {
                    elem.css("background-image", "url('" + src + "')");
                }
            }
        }
    }
})();
