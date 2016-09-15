(function() {
    "use strict";

    angular.module("TrytonApp.Modal")
        .controller("newTaskController", NewTaskController);

    function NewTaskController($scope, $filter) {
        $scope.options = {
            times: {
                min: 1,
                max: 25
            },
            restrict: {
                single: {
                    text: "in a single match",
                    multiplier: 0
                },
                row: {
                    text: "in a row matches",
                    multiplier: 0
                },
                noRestrict: {
                    text: "without restrictions",
                    multiplier: 0
                }
            },
            timeout: {
                hours: {
                    prefix: "within",
                    text: "hours",
                    multiplier: 0,
                    min: 1,
                    max: 100
                },
                won: {
                    prefix: "within",
                    text: "won matches",
                    multiplier: 0,
                    max: 100,
                },
                played: {
                    prefix: "within",
                    text: "played matches",
                    multiplier: 0,
                    max: 100
                },
                date: {
                    prefix: "until",
                    text: "date",
                    multiplier: 0
                }
            }
        };

        $scope.values = {
            times: 1,
            restrict: "single",
            timeout: {
                type: "won",
                values: {
                    hours: undefined,
                    won: undefined,
                    player: undefined,
                    date: new Date()
                }
            }
        };

        (function settingsHandler() {
            var times = "times";
            var restrict = "restrict";
            var timeout = "timeout";
            $scope.selectedSetting = times;

            $scope.isSelectedTimes = function() {
                return $scope.selectedSetting === times;
            }
            $scope.isSelectedRestrict = function() {
                return $scope.selectedSetting === restrict;
            }
            $scope.isSelectedTimeout = function() {
                return $scope.selectedSetting === timeout;
            }
            $scope.selectTimes = function() {
                $scope.selectedSetting = times;
            }
            $scope.selectRestrict = function() {
                $scope.selectedSetting = restrict;
            }
            $scope.selectTimeout = function() {
                $scope.selectedSetting = timeout;
            }

            $scope.isHoursSelected = function() {
                return $scope.values.timeout.type === "hours";
            }
            $scope.isWonSelected = function() {
                return $scope.values.timeout.type === "won";
            }
            $scope.isPlayedSelected = function() {
                return $scope.values.timeout.type === "played";
            }
            $scope.isDateSelected = function() {
                return $scope.values.timeout.type === "date";
            }

            $scope.printTimes = function() {
                return $scope.values.times + " times";
            }
            $scope.printRestrict = function() {
                return $scope.options.restrict[$scope.values.restrict].text;
            }
            $scope.printTimeout = function() {
            	var type = $scope.values.timeout.type;
                var selected = $scope.options.timeout[type];
                var value = $scope.values.timeout.values[type];

                if (type === "date") {
                	value = $filter("date")(value, "short");
                }


                var result = selected.prefix + " " + (value || "");
                if (type !== "date") {
                	result += " "+selected.text;
                }

                return result;
            }
        })();
    }
})();
