(function() {
    "use strict";

    angular.module("TrytonApp.Register")
        .controller("registerController", RegisterController);

    function RegisterController($scope, RecaptchaKey, $mdDialog) {
        var self = this;
        $scope.recaptchaKey = RecaptchaKey;
        $scope.register = {
            username: ""
        };
        $scope.submit = function(registerForm) {
            //TODO validacja formularza
            //        console.log($scope.register); // wartosci
            //        console.log(registerForm); // bledy

            // if ($scope.register.username.length > 0) {
            //     $uibModalInstance.close($scope.register);
            // }
        };
        $scope.close = function() {
            $mdDialog.cancel();
        };
        $scope.switchToLoginModal = function() {
            $scope.close();
            self.loginModal()();
        };
    }
})();
