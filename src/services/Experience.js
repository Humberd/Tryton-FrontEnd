(function() {
    "use strict";

    angular.module("TrytonApp.Experience", [])
        .factory("ExperienceTable", ExperienceTable);

    function ExperienceTable() {
        var _formula = formula;
        return {
            // 4 -> 5 lvl = 500 exp
            getRequiredExp: function(level) { // || level <= 0
                if (!angular.isNumber(level)) {
                    throw "Level must be a positive integer number";
                }
                return _formula(level);
            },
            // 1 -> 5 lvl = 1500 exp
            getTotalRequiredExp: function(level) {
                if (!angular.isNumber(level)) {
                    throw "Level must be a positive integer number";
                }
                var totalRequiredExp = 0;

                for (var i = 1; i <= level; i++) {
                    totalRequiredExp += _formula(i);
                }

                return totalRequiredExp;
            },
            // 1500 exp = 5 lvl
            getLevel: function(exp) {
                if (!angular.isNumber(exp)) {
                    throw "Exp must be a positive integer number";
                }
                var sum = 0;
                for (var i = 0;; i++) {
                    sum += _formula(i);
                    if (sum > exp) {
                        return i - 1;
                    }
                }
            },
            getRemainingExp: function(exp) {
                if (!angular.isNumber(exp)) {
                    throw "Exp must be a positive integer number";
                }
                var sum = 0;
                for (var i = 0;; i++) {
                    sum += _formula(i);
                    if (sum > exp) {
                        return sum - exp;
                    }
                }
            }
        }

        //zwraca tyle ile potrzebuje zeby wbic 1 level
        function formula(level) {
            return level * 100;
        }
    };
})();
