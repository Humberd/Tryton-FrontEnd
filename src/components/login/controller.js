(function() {
    "use strict";

    angular.module("TrytonApp.Login")
        .controller("loginController", LoginController);

    function LoginController($scope, $mdDialog) {
        var self = this;
        $scope.login = {
            email: ""
        };
        $scope.submit = function() {
            //TODO walidacja formularza
            //        console.log($scope.login); // wartosci

            // if ($scope.login.email.length > 0) {
            //     $scope.login.username = $scope.login.email;
            //     $uibModalInstance.close($scope.login);
            // }
        };
        $scope.close = function() {
            $mdDialog.cancel();
        };
        $scope.switchToRegisterModal = function() {
            $scope.close();
            self.registerModal()();
        };
    }
})();
