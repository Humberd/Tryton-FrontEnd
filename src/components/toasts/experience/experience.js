angular.module("TrytonApp.Toasts", [])
    .factory("Exp", ExpToastFactory)
    .directive("expToast", ExpToastDirective);

function ExpToastFactory($document, $sce, $rootScope, $compile) {
    let body = $document[0].body;
    return {
        foo: function() {
            // let toast = angular.element("<exp-toast>");
            // angular.element(body).append($compile("<exp-toast></exp-toast>")(null));
            let el = $compile("<exp-toast></exp-toast>")($rootScope.$new());
            angular.element(body).append(el);
        },
    };
}

function ExpToastDirective(ViewUrl) {
    return {
        restrict: "E",
        templateUrl: ViewUrl + "experience.html",
        link: function(scope, elem, attrs) {

        }
    }
}
