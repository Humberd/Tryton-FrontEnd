(function() {
    "use strict";

    angular.module("TrytonApp.Modal")
        .controller("registerController", RegisterController);

    function RegisterController($scope, $uibModalInstance, loginModal, RecaptchaKey) {
        $scope.register = {
            username: ""
        };
        $scope.recaptchaKey = RecaptchaKey;
        $scope.submit = function(registerForm) {
            //TODO validacja formularza
            //        console.log($scope.register); // wartosci
            //        console.log(registerForm); // bledy

            // if ($scope.register.username.length > 0) {
            //     $uibModalInstance.close($scope.register);
            // }
        };
        $scope.close = function() {
            $uibModalInstance.dismiss();
        };
        $scope.switchToLoginModal = function() {
            $scope.close();
            loginModal();
        };
    }
})();
