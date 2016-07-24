(function() {
    "use strict";

    angular.module("TrytonApp.Toasts")
        .controller("ExpToastController", ExpToastController);

    function ExpToastController($scope, ExperienceTable, $timeout, Logger, $q, Queue) {
        $scope.totalCurrentExp;
        $scope.level;
        $scope.haveExp;
        $scope.totalNeedExp;
        $scope.needExp;
        $scope.bar = {
            currentExp: 0,
            gainedExp: 0,
            remainingExp: 0
        }

        $scope.pills = [];
        $scope.gainedExp = 0;

        this.init = init;
        this.addTask = addTask;
        this.getPromise = getPromise;

        var TaskQueue = Queue({
            items: $scope.pills,
            onAddItem: function(exp, name) {
                return {
                    exp: exp,
                    name: name
                }
            },
            onStep: function() {
                var gainedExpQueue = new GainedExpQueue();

                //dodany exp
                var input = this.items[0].exp;

                var a;
                var level = $scope.level + 1;
                var needExp = $scope.needExp;
                //sprawdza czy awansowal na nowy level
                while ((a = input - needExp) > 0) {
                    //jesli awansowal, to dopelnia expa do nowego levela
                    $scope.totalCurrentExp += needExp;

                    //ustawia pozostaly zdobyty exp
                    input = a;

                    $scope.bar.gainedExp += needExp;
                    $scope.bar.remainingExp = 0;
                    //wrzuca prosble do kolejki o update wartosci
                    gainedExpQueue.add($scope.totalCurrentExp, needExp, angular.copy($scope.bar));

                    level++;
                    needExp = ExperienceTable.getRequiredExp(level);
                    $scope.bar.currentExp = 0;
                    $scope.bar.gainedExp = 0;
                    $scope.bar.remainingExp = needExp;
                }
                //--poczatek--nie awansowal
                $scope.totalCurrentExp += input;
                $scope.bar.gainedExp += input;
                $scope.bar.remainingExp -= input;
                gainedExpQueue.add($scope.totalCurrentExp, input, angular.copy($scope.bar));
                //--koniec-nie awansowal

                var self = this;
                //jesli wszystkie prosbe o update zakonczyly sie pomyslnie
                gainedExpQueue.getPromise().then(function() {
                    self.finishStep();
                });
            }
        })
        var GainedExpQueue = Queue({
            onAddItem: function(totalCurrentExp, gainedExp, bar) {
                return {
                    totalCurrentExp: totalCurrentExp,
                    gainedExp: gainedExp,
                    bar: bar
                }
            },
            onStep: function() {
                //updatuje wszystkie wartosci
                updateValues(this.items[0].totalCurrentExp);
                $scope.gainedExp += this.items[0].gainedExp;

                $scope.$broadcast("updateBar", this.items[0].bar);

                var self = this;

                $timeout(function() {
                    self.finishStep();
                }, 2000);
            }
        });

        var taskQueue = new TaskQueue();

        function init(totalCurrentExp) {
            if (!angular.isNumber(totalCurrentExp) || totalCurrentExp < 0) {
                throw new TypeError("TotalCurrentExp must be a positive integer number");
            }
            if ($scope.totalCurrentExp) {
                Logger.error("Exp toast is already initialized");
                return;
            }
            $scope.totalCurrentExp = totalCurrentExp;
            updateValues($scope.totalCurrentExp);
            $scope.bar.currentExp = $scope.haveExp;
            $scope.bar.remainingExp = $scope.needExp;
        }

        function addTask(input, name) {
            if (!angular.isNumber(input) || input < 0) {
                throw new TypeError("CompletedTask exp must be a positive integer number");
            }

            if (!$scope.isShown) {
                // if (!$scope.isShowing) {
                //     $scope.$broadcast("show");
                // }
                $scope.$broadcast("updateBar", {
                    currentExp: $scope.haveExp,
                    gainedExp: 0,
                    remainingExp: $scope.needExp
                })
                var listener = $scope.$watch("isShown", function (newVal) {
                    if (newVal) {
                        add();
                        listener();
                    }
                })
            } else {
                add();
            }

            function add() {
                taskQueue.add(input, name);
                $scope.haveExpAtStart = $scope.haveExp;
            }
        }

        function getPromise() {
            return taskQueue.getPromise();
        }

        function updateValues(totalCurrentExp) {
            $scope.level = ExperienceTable.getLevel(totalCurrentExp);
            $scope.haveExp = totalCurrentExp - ExperienceTable.getTotalRequiredExp($scope.level);
            $scope.totalNeedExp = ExperienceTable.getRequiredExp($scope.level + 1);
            $scope.needExp = $scope.totalNeedExp - $scope.haveExp;
            Logger.info("TotalCurr[%s] | Lvl[%s] | Have[%s] | Need[%s] | TotalNeed[%s]",
                totalCurrentExp,
                $scope.level,
                $scope.haveExp,
                $scope.needExp,
                $scope.totalNeedExp);
        }
    }
})();
