(function() {
    "use strict";

    angular.module("TrytonApp")
        .controller("indexController", IndexController);

    function IndexController($scope, ExpToast, $mdToast) {
        $scope.foo = "";
        // $scope.click = function() {
        //     $mdToast.showSimple({
        //         textContent: "Hello",
        //         hideDelay: 100000
        //     });
        // }
        $scope.click = function() {
            ExpToast.addTask(200);
        }
        // $scope.click();
        ExpToast.init(170);
    }

})();
