(function() {
    "use strict";

    angular.module("TrytonApp.Toasts")
        .controller("ExpToastController", ExpToastController);

    function ExpToastController($scope, ExperienceTable) {
        $scope.level;
        $scope.haveExp;
        $scope.totalNeedExp;
        $scope.needExp;

        this.setTotalCurrentExp = function(totalCurrentExp) {
            if (!angular.isNumber(totalCurrentExp) || totalCurrentExp < 0) {
                throw "TotalCurrentExp must be a positive integer number";
            }
            $scope.level = ExperienceTable.getLevel(totalCurrentExp);
            $scope.haveExp = totalCurrentExp - ExperienceTable.getTotalRequiredExp($scope.level);
            $scope.totalNeedExp = ExperienceTable.getRequiredExp($scope.level + 1);
            $scope.needExp = $scope.totalNeedExp - $scope.haveExp;
            print();
        }

        this.addCompletedTask = function(exp, name) {
            if (!angular.isNumber(exp) || exp < 0) {
                throw "CompletedTask exp must be a positive integer number";
            }
            if (exp > 0) {
                //add pill here
                if (exp < $scope.needExp) {
                    $scope.needExp -= exp;
                    $scope.haveExp += exp;
                } else {
                    //add some fancy level up animation here
                    $scope.level++;
                    $scope.haveExp = ($scope.haveExp + exp) - $scope.totalNeedExp;
                    $scope.totalNeedExp = ExperienceTable.getRequiredExp($scope.level + 1);
                    $scope.needExp = $scope.totalNeedExp - $scope.haveExp;
                    console.log("Level up");
                }
            }
            print();
        }

        function print() {
            console.log("level [%s] -> haveExp [%s] -> totalNeedExp [%s] -> needExp [%s]",
                $scope.level, $scope.haveExp, $scope.totalNeedExp, $scope.needExp);
        }
    }
})();
