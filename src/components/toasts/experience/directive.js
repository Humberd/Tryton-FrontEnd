(function() {
    "use strict";

    angular.module("TrytonApp.Toasts")
        .directive("expToast", ExpToastDirective);

    function ExpToastDirective(ViewUrl, Logger) {
        return {
            restrict: "E",
            templateUrl: ViewUrl + "expToast.html",
            replace: true,
            link: link
        }

        function link(scope, elem, attrs) {
            var bars = {
                currentExp: angular.element(elem[0].querySelector(".currentExp")),
                gainedExp: angular.element(elem[0].querySelector(".gainedExp")),
                remainingExp: angular.element(elem[0].querySelector(".remainingExp"))
            }

            scope.$on("updateBar", function() {
                resizeBars(scope, bars);
                console.log("hi");
            });
            // scope.$watchGroup(["haveExpAtStart", "gainedExp", "needExp"], function() {
            //     resizeBars(scope, bars);
            // })
        }

        function resizeBars(scope, bars) {
            var currentExp = scope.haveExp;
            var gainedExp = scope.gainedExp;
            var remainingExp = scope.needExp;

            Logger.info("Curr[%s], Gain[%s], Rem[%s]",
                currentExp,
                gainedExp,
                remainingExp
            );

            var sum = currentExp + gainedExp + remainingExp;

            setWidth(bars.currentExp, ((currentExp / sum) * 100) + "%");
            setWidth(bars.gainedExp, ((gainedExp / sum) * 100) + "%");
            setWidth(bars.remainingExp, ((remainingExp / sum) * 100) + "%");
        }

        function setWidth(elem, width) {
            if (angular.isNumber(width)) {
                width += "px";
            }
            elem.css({
                width: width
            })
        }
    }

})();
