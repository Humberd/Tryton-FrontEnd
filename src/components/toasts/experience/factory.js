(function() {
    "use strict";

    angular.module("TrytonApp.Toasts")
        .factory("Exp", ExpToastFactory);

    function ExpToastFactory($document, $sce, $rootScope, $compile, $timeout, $controller, ExperienceTable) {
        var _body = $document[0].body;
        var _toast = angular.element("<exp-toast>");
        var _isDisplayed = false;
        var _configs = {
            hideDelay: 400000
        };
        var toastScopeFields = {
            currentExp: 500,
            gainedExp: 0,
            requiredExp: 5000,
            pills: [{
                gainedExp: 200,
                name: "Completed tutorial."
            }]
        };
        var _timeoutPromise;
        var toastScope;
        var toastController;
        return {
            show: function() {
                if (!_isDisplayed) {
                    _isDisplayed = true;

                    this._createScope();
                    this._bindController();
                    toastController.setTotalCurrentExp(0);

                    var compiledToast = $compile(_toast)(toastScope);
                    angular.element(_body).append(compiledToast);

                    this._setTimeout();
                } else {
                    this._cancelTimeout();
                    this._setTimeout();
                }
            },
            hide: function() {
                _toast.remove();
                this._destroyScope();
                _isDisplayed = false;
            },
            addCompletedTask: function (exp, name) {
                toastController.addCompletedTask(exp, name);
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
                    ExperienceTable: ExperienceTable
                });
            },
        };
    }

})();
