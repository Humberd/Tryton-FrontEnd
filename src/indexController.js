(function() {
    "use strict";

    angular.module("TrytonApp")
        .controller("indexController", IndexController);

    function IndexController($scope, Exp, $mdToast) {
        $scope.foo = "";
        // $scope.click = function() {
        //     $mdToast.showSimple({
        //         textContent: "Hello",
        //         hideDelay: 100000
        //     });
        // }
        $scope.click = function() {
            Exp.addCompletedTask(830);
        }
        // $scope.click();
        Exp.show();
    }

})();
