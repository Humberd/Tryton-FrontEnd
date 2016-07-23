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

                    //wrzuca prosble do kolejki o update wartosci
                    gainedExpQueue.add($scope.totalCurrentExp, $scope.needExp);

                    level++;
                    needExp = ExperienceTable.getRequiredExp(level);
                }
                //--poczatek--nie awansowal
                $scope.totalCurrentExp += input;
                gainedExpQueue.add($scope.totalCurrentExp, input);
                //--koniec-nie awansowal

                var self = this;
                //jesli wszystkie prosbe o update zakonczyly sie pomyslnie
                gainedExpQueue.getPromise().then(function() {
                    self.finishStep();
                });
            }
        })
        var GainedExpQueue = Queue({
            onAddItem: function(totalCurrentExp, gainedExp) {
                return {
                    totalCurrentExp: totalCurrentExp,
                    gainedExp: gainedExp
                }
            },
            onStep: function() {
                //updatuje wszystkie wartosci
                updateValues(this.items[0].totalCurrentExp);
                $scope.gainedExp += this.items[0].gainedExp;

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
        }

        function addTask(input, name) {
            if (!angular.isNumber(input) || input < 0) {
                throw new TypeError("CompletedTask exp must be a positive integer number");
            }

            taskQueue.add(input, name);
            // self.taskQueue.addPill(input, name);
        }

        function getPromise() {
            return taskQueue.getPromise();
        }

        // function TaskQueue() {
        //     var self = this;
        //     var defer = $q.defer()
        //     this.addPill = addPill;
        //     this.pills = $scope.pills;
        //     this.promise = defer.promise;

        //     function addPill(exp, name) {
        //         var newPill = {
        //             exp: exp,
        //             name: name
        //         };

        //         //dodaje taska do kolejki
        //         self.pills.push(newPill);

        //         //jesli task jest pierwszym w kolejce, to rozpoczyna updatowanie expa
        //         if (self.pills.length === 1) {
        //             startCalculatingExp();
        //         }
        //     }

        //     function startCalculatingExp() {
        //         var gainedExpQueue = new GainedExpQueue();

        //         //ile expa daje aktualny task
        //         var input = self.pills[0].exp;

        //         var a;
        //         var level = $scope.level + 1;
        //         var needExp = $scope.needExp;
        //         //sprawdza czy awansowal na nowy level
        //         while ((a = input - needExp) > 0) {
        //             //jesli awansowal, to dopelnia expa do nowego levela
        //             $scope.totalCurrentExp += needExp;

        //             //ustawia pozostaly zdobyty exp
        //             input = a;

        //             //wrzuca prosble do kolejki o update wartosci
        //             gainedExpQueue.addUpdate($scope.totalCurrentExp, $scope.needExp);

        //             level++;
        //             needExp = ExperienceTable.getRequiredExp(level);
        //         }
        //         //nie awansowal
        //         $scope.totalCurrentExp += input;
        //         gainedExpQueue.addUpdate($scope.totalCurrentExp, input);
        //         //nie awansowal

        //         //jesli wszystkie prosbe o update zakonczyly sie pomyslnie
        //         gainedExpQueue.isEnded.then(function() {
        //             //zdejmuje task z kolejki
        //             self.pills.shift();

        //             //jesli zostaly jakies inne taski w kolejce
        //             if (self.pills.length > 0) {
        //                 startCalculatingExp();
        //             } else {
        //                 //wysylam info o pomyslnym zupdatowaniu wszystkich taskow
        //                 defer.resolve();
        //             }
        //         });

        //     }
        // };

        // function GainedExpQueue() {
        //     var defer = $q.defer();
        //     this.addUpdate = addUpdate;
        //     this.timeout = 2000;
        //     this.isEnded = defer.promise;

        //     var self = this;
        //     var queue = [];

        //     function addUpdate(totalCurrentExp, gainedExp) {
        //         var updateObject = {
        //                 totalCurrentExp: totalCurrentExp,
        //                 gainedExp: gainedExp
        //             }
        //             //wrzucam prosbe o update wartosci do kolejki
        //         queue.push(updateObject);

        //         //jesli jestem pierwsza prosba, to rozpoczynam updatowanie
        //         if (queue.length === 1) {
        //             update();
        //         }
        //     }

        //     function update() {
        //         //updatuje wszystkie wartosci
        //         updateValues(queue[0].totalCurrentExp);
        //         $scope.gainedExp += queue[0].gainedExp;

        //         $timeout(function() {
        //             //po kilku sekundach wyrzucam z kolejki aktualna prosbe
        //             queue.splice(0, 1);

        //             //jesli sa jeszcze jakies inne, to kontynuuje updatowanie
        //             if (queue.length > 0) {
        //                 update();
        //             } else {
        //                 //jesli nie ma, to wysylam wiadomosc do taska, ze cale updatowanie przebieglo pomyslnie
        //                 defer.resolve();
        //             }
        //         }, self.timeout);
        //     }
        // };

        function updateValues(totalCurrentExp) {
            $scope.level = ExperienceTable.getLevel(totalCurrentExp);
            $scope.haveExp = totalCurrentExp - ExperienceTable.getTotalRequiredExp($scope.level);
            $scope.totalNeedExp = ExperienceTable.getRequiredExp($scope.level + 1);
            $scope.needExp = $scope.totalNeedExp - $scope.haveExp;
            Logger.info("[%s] | [%s] | [%s] | [%s] | [%s]",
                totalCurrentExp,
                $scope.level,
                $scope.haveExp,
                $scope.needExp,
                $scope.totalNeedExp);
        }
    }
})();
