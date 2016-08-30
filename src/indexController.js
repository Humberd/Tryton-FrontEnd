(function() {
    "use strict";

    angular.module("TrytonApp")
        .controller("indexController", IndexController);

    function IndexController($scope, ExpToast, $mdToast, $state, $timeout) {
        $scope.click = function() {
            ExpToast.addTask(20);
        }
    }

})();
