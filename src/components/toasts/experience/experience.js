angular.module("TrytonApp.Toasts", [])
    .factory("Exp", ExpToastFactory)
    .directive("expToast", ExpToastDirective);

function ExpToastFactory($document, $sce, $rootScope, $compile, $timeout) {
    let _body = $document[0].body;
    let _toast = angular.element("<exp-toast>");
    let _isDisplayed = false;
    let _configs = {
        hideDelay: 400000
    };
    let _timeoutPromise;
    return {
        show: function() {
            if (!_isDisplayed) {
                _isDisplayed = true;

                let compiledToast = $compile(_toast)($rootScope.$new());
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

function ExpToastDirective(ViewUrl) {
    return {
        restrict: "E",
        templateUrl: ViewUrl + "experience.html",
        replace: true,
        link: function(scope, elem, attrs) {

        }
    }
}
