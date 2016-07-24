(function() {
    "use strict";

    angular.module("TrytonApp.Toasts")
        .directive("expToast", ExpToastDirective);

    function ExpToastDirective(ViewUrl, Logger, $animate, $timeout, $q) {
        return {
            restrict: "E",
            templateUrl: ViewUrl + "expToast.html",
            replace: true,
            link: link
        }

        function link(scope, elem, attrs) {
            scope.isShown = false;
            scope.isShowing = false;
            scope.isHidden = true;
            scope.isHiding = false;
            // animateShow().then(function() {
            //     console.log("done");
            // });

            scope.$on("show", function () {
                if (scope.isShown) {
                    Logger.warning("Exp Bar is already visibale -- cannot Show");
                    return;
                }
                if (scope.isShowing) {
                    Logger.warning("Exp Bar is in the middle of showing animation -- cannot Show");
                    return;
                }
                if (scope.isHiding) {
                    Logger.warning("Exp Bar is in the middle of hiding animation -- cannot Show");
                    return;
                }
                if (!scope.isHidden) {
                    Logger.warning("Exp Bar is not hidden -- cannot Show")
                    return;
                }


                scope.isShowing = true;
                animateShow().then(function () {
                    scope.isShown = true;
                    scope.isHidden = false;
                    Logger.info("Exp Bar show animated successfully");
                }, function () {
                    Logger.error("Error while showing Exp Bar")
                }).finally(function () {
                    scope.isShowing = false;
                });
            });

            scope.$on("hide", function () {
                if (scope.isHidden) {
                    Logger.warning("Exp Bar is already hidden -- cannot Hide");
                    return;
                }
                if (scope.isHiding) {
                    Logger.warning("Exp Bar is in the middle of hiding animation -- cannot Hide");
                    return;
                }
                if (scope.isShowing) {
                    Logger.warning("Exp Bar is in the middle of showing animation -- cannot Hide");
                    return;
                }
                if (!scope.isShown) {
                    Logger.warning("Exp Bar is not  shown -- cannot Hide")
                }

                scope.isHiding = true;
                animateHide().then(function () {
                    scope.isHidden = true;
                    scope.isShown = false;
                    Logger.info("Exp Bar hide animated successfully");
                }, function () {
                    Logger.error("Error while hiding Exp Bar");
                }).finally(function () {
                    scope.isHiding = false;
                });
            });

            function animateShow() {
                var defer = $q.defer();
                $timeout(function() {
                    $animate.addClass(elem, "is-visible").then(function(result) {
                        defer.resolve(result);
                    }, function(reason) {
                        defer.reject(reason);
                    });
                }, 0);

                return defer.promise;
            }

            function animateHide() {
                var defer = $q.defer();
                $timeout(function() {
                    $animate.removeClass(elem, "is-visible").then(function(result) {
                        defer.resolve(result);
                    }, function(reason) {
                        defer.reject(reason);
                    });
                }, 0);

                return defer.promise
            }

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
