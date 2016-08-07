(function() {
    "use strict";

    angular.module("TrytonApp")
        .controller("indexController", IndexController);

    function IndexController($scope, ExpToast, $mdToast) {
        $scope.click = function() {
            ExpToast.addTask(500);
        }
    }

})();
