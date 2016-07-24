(function() {
    "use strict";

    angular.module("TrytonApp.Toasts")
        .factory("ExpToast", ExpToastFactory);

    function ExpToastFactory($document, $sce, $rootScope, $compile, $timeout, $controller, ExperienceTable, Logger, $q, Queue, $animate) {
        var _body = $document[0].body;
        var _toast = angular.element("<exp-toast>");
        var _isDisplayed = false;
        var _isInitialized = false;

        var _timeoutPromise;
        var toastScope;
        var toastController;
        return {
            init: function(exp) {
                if (_isInitialized) {
                    Logger.error("ExpToast is already initialized");
                    return;
                }

                _isInitialized = true;
                this._createScope();
                this._bindController();
                var self = this;
                toastController.getPromise().then(function() {
                    // self._hide();
                    toastScope.$broadcast("hide");
                });
                toastController.init(exp);
            },

            addTask: function(exp, name) {
                if (!_isInitialized) {
                    Logger.error("ExpToast must be initialized");
                    return;
                }
                if (!_isDisplayed) {
                    this._show().then(function() {
                        toastController.addTask(exp, name);
                    });
                } else {
                    toastController.addTask(exp, name);
                }
            },
            _show: function() {
                _isDisplayed = true;

                var defer = $q.defer();

                var compiledToast = $compile(_toast)(toastScope);

                //czeka, az funkcja link sie zaladuje, wtedy dodaje element do DOM,
                //usuwa linkListener i wykonuje obietnice
                var linkListener = toastScope.$watch("isLink", function(newVal) {
                    if (newVal) {
                        angular.element(_body).append(compiledToast);
                        toastScope.$broadcast("show");
                        linkListener();
                        defer.resolve();
                    }
                });

                return defer.promise;
            },
            _hide: function() {
                _toast.remove();
                this._destroyScope();
                toastController = null;
                _isDisplayed = false;
                _isInitialized = false;
            },
            _setTimeout: function() {
                var self = this;
                _timeoutPromise = $timeout(function() {
                    self.hide();
                }, _configs.hideDelay);
            },
            _cancelTimeout: function() {
                $timeout.cancel(_timeoutPromise);
            },
            _createScope: function() {
                toastScope = $rootScope.$new();
            },
            _destroyScope: function() {
                toastScope.$destroy();
            },
            _bindController: function() {
                toastController = $controller("ExpToastController", {
                    $scope: toastScope,
                    ExperienceTable: ExperienceTable,
                    $timeout: $timeout,
                    Logger: Logger,
                    $q: $q,
                    Queue: Queue
                });
            },
        };
    }

})();
