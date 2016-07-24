(function() {
    "use strict";

    angular.module("TrytonApp.Toasts")
        .service("Queue", QueueService);

    function QueueService($q) {
        return function() {
            return function(config) {
                // config = {
                // 	items: Array,
                // 	onAddItem: Function,
                // 	onStep: Function,
                // }
                function Queue() {
                    this.defer = $q.defer();
                }

                Queue.prototype.getPromise = function getPromise() {
                    return this.defer.promise;
                }

                Queue.prototype.items = config.items || [];

                Queue.prototype.add = function add() {
                    var newObject = config.onAddItem.apply(this, arguments);

                    this.items.push(newObject);

                    if (this.items.length === 1) {
                        this.nextStep();
                    }
                }
                Queue.prototype.nextStep = function nextStep() {
                    config.onStep.call(this);
                }

                Queue.prototype.finishStep = function finishStep() {
                    this.items.splice(0, 1);

                    if (this.items.length > 0) {
                        this.nextStep();
                    } else {
                        this.defer.resolve();
                    }
                }

                return Queue;
            };
        }()
    }
})();
