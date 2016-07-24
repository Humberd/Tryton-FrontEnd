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

            scope.$on("updateBar", function(event, values) {
                resizeBars(scope, bars, values);
            });

            //zmienna informujaca kontroler, ze funkcja link zostala zaladowana
            scope.isLink = true;
        }

        function resizeBars(scope, bars, values) {
            Logger.info("Bar => Curr[%s], Gain[%s], Rem[%s]",
                values.currentExp,
                values.gainedExp,
                values.remainingExp
            );

            var sum = 0;
            for (var p in values) {
                sum += values[p];
            }

            //ustawiam dla kazdego baru dlugosc
            for (var p in bars) {
                setWidth(bars[p], ((values[p] / sum) * 100) + "%");
            }
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
