(function() {
    "use strict";

    angular.module("TrytonApp.Toasts")
        .controller("ExpToastController", ExpToastController);

    function ExpToastController($scope, ExperienceTable, $timeout, Logger, $q) {
        $scope.totalCurrentExp;
        $scope.level;
        $scope.haveExp;
        $scope.totalNeedExp;
        $scope.needExp;

        $scope.pills = [];
        $scope.gainedExp = 0;

        this.init = init;
        this.addCompletedTask = addCompletedTask;

        var taskQueue = new TaskQueue();

        function updateValues(totalCurrentExp) {
            $scope.level = ExperienceTable.getLevel(totalCurrentExp);
            $scope.haveExp = totalCurrentExp - ExperienceTable.getTotalRequiredExp($scope.level);
            $scope.totalNeedExp = ExperienceTable.getRequiredExp($scope.level + 1);
            $scope.needExp = $scope.totalNeedExp - $scope.haveExp;
            console.log("[%s] | [%s] | [%s] | [%s] | [%s]",
                totalCurrentExp,
                $scope.level,
                $scope.haveExp,
                $scope.needExp,
                $scope.totalNeedExp);
        }

        function init(totalCurrentExp) {
            if (!angular.isNumber(totalCurrentExp) || totalCurrentExp < 0) {
                throw "TotalCurrentExp must be a positive integer number";
            }
            if ($scope.totalCurrentExp) {
                Logger.error("Exp toast is already initialized");
                return;
            }
            $scope.totalCurrentExp = totalCurrentExp;
            updateValues($scope.totalCurrentExp);
        }

        function addCompletedTask(input, name) {
            if (!angular.isNumber(input) || input < 0) {
                throw "CompletedTask exp must be a positive integer number";
            }

            taskQueue.addPill(input, name);
            // var a;
            // while ((a = input - $scope.needExp) > 0) {
            //     $scope.totalCurrentExp += $scope.needExp;

            //     input = a;
            //     updateValues($scope.totalCurrentExp);
            // }
            // $scope.totalCurrentExp += input;
            // updateValues($scope.totalCurrentExp);
        }

        function TaskQueue() {
            var self = this;
            var defer = $q.defer()
            this.addPill = addPill;
            this.pills = $scope.pills;
            this.promise = defer.promise;

            function addPill(exp, name) {
                var newPill = {
                    exp: exp,
                    name: name
                };

                //dodaje taska do kolejki
                self.pills.push(newPill);

                //jesli task jest pierwszym w kolejce, to rozpoczyna updatowanie expa
                if (self.pills.length === 1) {
                    startCalculatingExp();
                }
            }

            function startCalculatingExp() {
                var gainedExpQueue = new GainedExpQueue();

                //ile expa daje aktualny task
                var input = self.pills[0].exp;

                var a;
                //sprawdza czy awansowal na nowy level
                while ((a = input - $scope.needExp) > 0) {
                    //jesli awansowal, to dopelnia expa do nowego levela
                    $scope.totalCurrentExp += $scope.needExp;

                    //ustawia pozostaly zdobyty exp
                    input = a;

                    //wrzuca prosble do kolejki o update wartosci
                    gainedExpQueue.addUpdate($scope.totalCurrentExp, $scope.needExp);
                }
                //nie awansowal
                $scope.totalCurrentExp += input;
                gainedExpQueue.addUpdate($scope.totalCurrentExp, input);
                //nie awansowal

                //jesli wszystkie prosbe o update zakonczyly sie pomyslnie
                gainedExpQueue.isEnded.then(function () {
                    //zdejmuje task z kolejki
                    self.pills.shift();

                    //jesli zostaly jakies inne taski w kolejce
                    if (self.pills.length > 0) {
                        startCalculatingExp();
                    } else {
                        //wysylam info o pomyslnym zupdatowaniu wszystkich taskow
                        defer.resolve();
                    }
                });

            }
        };

        function GainedExpQueue() {
            var defer = $q.defer();
            this.addUpdate = addUpdate;
            this.timeout = 2000;
            this.isEnded = defer.promise;

            var self = this;
            var queue = [];

            function addUpdate(totalCurrentExp, gainedExp) {
                var updateObject = {
                    totalCurrentExp: totalCurrentExp,
                    gainedExp: gainedExp
                }
                //wrzucam prosbe o update wartosci do kolejki
                queue.push(updateObject);

                //jesli jestem pierwsza prosba, to rozpoczynam updatowanie
                if (queue.length === 1) {
                    update();
                }
            }

            function update() {
                //updatuje wszystkie wartosci
                updateValues(queue[0].totalCurrentExp);
                $scope.gainedExp += queue[0].gainedExp;

                $timeout(function() {
                    //po kilku sekundach wyrzucam z kolejki aktualna prosbe
                    queue.splice(0, 1);

                    //jesli sa jeszcze jakies inne, to kontynuuje updatowanie
                    if (queue.length > 0) {
                        update();
                    } else {
                        //jesli nie ma, to wysylam wiadomosc do taska, ze cale updatowanie przebieglo pomyslnie
                        defer.resolve();
                    }
                }, self.timeout);
            }
        };

        // this.setTotalCurrentExp = function(totalCurrentExp) {
        //     if (!angular.isNumber(totalCurrentExp) || totalCurrentExp < 0) {
        //         throw "TotalCurrentExp must be a positive integer number";
        //     }
        //     $scope.level = ExperienceTable.getLevel(totalCurrentExp);
        //     $scope.haveExp = totalCurrentExp - ExperienceTable.getTotalRequiredExp($scope.level);
        //     $scope.totalNeedExp = ExperienceTable.getRequiredExp($scope.level + 1);
        //     $scope.needExp = $scope.totalNeedExp - $scope.haveExp;
        //     // print();
        // }

        // this.addCompletedTask = function(exp, name) {
        //     if (!angular.isNumber(exp) || exp < 0) {
        //         throw "CompletedTask exp must be a positive integer number";
        //     }
        //     if (exp > 0) {
        //         //add pill here
        //         if (exp < $scope.needExp) {
        //             $scope.needExp -= exp;
        //             $scope.haveExp += exp;
        //         } else {
        //             //add some fancy level up animation here
        //             $scope.level++;
        //             $scope.haveExp = ($scope.haveExp + exp) - $scope.totalNeedExp;
        //             $scope.totalNeedExp = ExperienceTable.getRequiredExp($scope.level + 1);
        //             $scope.needExp = $scope.totalNeedExp - $scope.haveExp;
        //             console.log("Level up");
        //         }
        //     }
        //     // print();
        // }

    }
})();
