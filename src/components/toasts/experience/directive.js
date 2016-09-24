(function() {
    "use strict";

    angular.module("TrytonApp.Toasts")
        .directive("expToast", ExpToastDirective);

    function ExpToastDirective(ViewUrl, Logger, $animate, $timeout, $q) {

        function link(scope, elem, attrs) {
            scope.isShown = false;
            scope.isShowing = false;
            scope.isHidden = true;
            scope.isHiding = false;
            scope.denyHiding = false;
            // animateShow().then(function() {
            //     console.log("done");
            // });

            scope.show = function() {
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
                return animateShow().then(function() {
                    scope.isShown = true;
                    scope.isHidden = false;
                    Logger.debug("expToast link show() -- Exp Bar show animated successfully");
                }, function() {
                    Logger.error("expToast link show() -- Error while showing Exp Bar")
                }).finally(function() {
                    scope.isShowing = false;
                });
            };

            scope.hide = function() {
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
                return animateHide().then(function() {
                    scope.isHidden = true;
                    scope.isShown = false;
                    Logger.debug("expToast link hide() -- Exp Bar hide animated successfully");
                }, function() {
                    Logger.error("expToast link hide() -- Error while hiding Exp Bar");
                }).finally(function() {
                    scope.isHiding = false;
                });
            };

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
            };

            scope.updateBar = function(values) {
                resizeBars(scope, bars, values);
            };

            Logger.debug("expToast link -- Setting isLink to true");
            //zmienna informujaca kontroler, ze funkcja link zostala zaladowana
            scope.isLink = true;
        }

        var previouslyRemainingExp = 0;

        function resizeBars(scope, bars, values) {
            Logger.info("Bar => Curr[%s], Gain[%s], Rem[%s]",
                values.currentExp,
                values.gainedExp,
                values.remainingExp
            );

            if (previouslyRemainingExp === 0) {
                setWidth(bars.currentExp, "0%", false);
                setWidth(bars.gainedExp, "0%", false);
                setWidth(bars.remainingExp, "100%", false);
            }

            var sum = 0;
            for (var p in values) {
                sum += values[p];
            }

            $timeout(function() {
                //ustawiam dla kazdego baru dlugosc
                for (var p in bars) {
                    setWidth(bars[p], ((values[p] / sum) * 100) + "%", true);
                }
                previouslyRemainingExp = values.remainingExp;
            }, 0);
        }

        function setWidth(elem, width, makeTransition) {
            if (angular.isNumber(width)) {
                width += "px";
            }
            if (makeTransition) {
                elem.addClass("transition");
            } else {
                elem.removeClass("transition");
            }
            elem.css({
                width: width
            });
        }

        return {
            restrict: "E",
            templateUrl: ViewUrl + "expToast.html",
            replace: true,
            link: link
        };
    }
})();
