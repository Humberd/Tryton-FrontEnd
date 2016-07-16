(function() {
    "use strict";

    angular.module("TrytonApp.Toasts")
        .factory("Exp", ExpToastFactory);

    function ExpToastFactory($document, $sce, $rootScope, $compile, $timeout) {
        var _body = $document[0].body;
        var _toast = angular.element("<exp-toast>");
        var _isDisplayed = false;
        var _configs = {
            hideDelay: 400000
        };
        var _timeoutPromise;
        return {
            show: function() {
                if (!_isDisplayed) {
                    _isDisplayed = true;

                    var compiledToast = $compile(_toast)($rootScope.$new());
                    angular.element(_body).append(compiledToast);

                    this._setTimeout();
                } else {
                    this._cancelTimeout();
                    this._setTimeout();
                }
            },
            hide: function() {
                _toast.remove();
                _isDisplayed = false;
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


        };
    }

})();
