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
        this.taskQueue = new TaskQueue();
        var self = this;
        this.promise = this.taskQueue.promise;
        ////////////

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

        function addCompletedTask(input, name) {
            if (!angular.isNumber(input) || input < 0) {
                throw new TypeError("CompletedTask exp must be a positive integer number");
            }

            self.taskQueue.addPill(input, name);
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
                var level = $scope.level + 1;
                var needExp = $scope.needExp;
                //sprawdza czy awansowal na nowy level
                while ((a = input - needExp) > 0) {
                    //jesli awansowal, to dopelnia expa do nowego levela
                    $scope.totalCurrentExp += needExp;

                    //ustawia pozostaly zdobyty exp
                    input = a;

                    //wrzuca prosble do kolejki o update wartosci
                    gainedExpQueue.addUpdate($scope.totalCurrentExp, $scope.needExp);

                    level++;
                    needExp = ExperienceTable.getRequiredExp(level);
                }
                //nie awansowal
                $scope.totalCurrentExp += input;
                gainedExpQueue.addUpdate($scope.totalCurrentExp, input);
                //nie awansowal

                //jesli wszystkie prosbe o update zakonczyly sie pomyslnie
                gainedExpQueue.isEnded.then(function() {
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
