(function() {
    "use strict";

    angular.module("TrytonApp.Toasts")
        .factory("ExpToast", ExpToastFactory);

    function ExpToastFactory($document, $sce, $rootScope, $compile, $timeout,
        $controller, ExperienceTable, Logger, $q, Queue, $animate, Session) {
        var _body = $document[0].body;
        var _toast;
        var _isDisplayed = false;
        var _isInitialized = false;

        var toastScope;
        var toastController;

        return {
            _init: function(exp) {
                this._createScope();
                this._bindController();
                toastController.init(Session.getUserExp());
                get_toast();
            },

            addTask: function(exp, name) {
                Logger.debug("ExpToastFactory addTask() _isDisplayed is %s", _isDisplayed);

                if (!_isDisplayed) {
                    this._show().then(function() {
                        Logger.debug("ExpToastFactory addTask() _show() method resolved. Trying to addTask...");

                        toastController.addTask(exp, name);
                    });
                } else {
                    toastController.addTask(exp, name);
                }
            },
            _show: function() {
                var self = this;
                _isDisplayed = true;

                var defer = $q.defer();

                this._init();

                toastController.getPromise().then(function() {
                    self._hide();
                })

                var compiledToast = $compile(_toast)(toastScope);

                //czeka, az funkcja link sie zaladuje, wtedy dodaje element do DOM,
                //usuwa linkListener i wykonuje obietnice
                var linkListener = toastScope.$watch("isLink", function(newVal) {
                    Logger.debug("ExpToastFactory _show() -- $watch(isLink) is %s", newVal);

                    if (newVal) {
                        linkListener();
                        angular.element(_body).append(compiledToast);
                        toastScope.show().then(function() {
                            defer.resolve();

                            Logger.debug("ExpToastFactory _show() -- Showed Exp Bar component");
                        });

                    }
                });

                return defer.promise;
            },
            _hide: function() {
                var self = this;
                toastScope.hide().then(function() {
                    _toast.remove();
                    _toast = null;
                }).then(function() {
                    Logger.debug("ExpToastFactory _hide() -- Removed Exp Bar from DOM");
                }).then(function() {
                    self._destroyScope();
                    toastScope = null;
                    toastController = null;
                    _isDisplayed = false;
                }).then(function() {
                    Logger.debug("ExpToastFactory _hide() -- Hid Exp Bar component");
                })
            },
            _createScope: function() {
                toastScope = $rootScope.$new();

                Logger.debug("ExpToastFactory _createScope() -- Created toastScope");
            },
            _destroyScope: function() {
                toastScope.$destroy();
                toastScope = null;

                Logger.debug("ExpToastFactory _destroyScope() -- Destroyed toastScope");
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

                Logger.debug("ExpToastFactory _bindController() -- Instantiated toast Controller");
            },
        };

        function get_toast() {
            _toast = angular.element("<exp-toast>");

            Logger.debug("ExpToastFactory get_toast() -- Created _toast element");
        }
    }

})();
