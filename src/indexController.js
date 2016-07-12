angular.module("TrytonApp")
    .controller("indexController", indexController);

function indexController($scope, Exp, $mdToast) {
    $scope.foo = "";
    Exp.foo();
    $scope.click = function() {
        $mdToast.showSimple({
            textContent: "Hello",
            hideDelay: 100000
        });
    }
}
