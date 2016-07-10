angular.module("TrytonApp.Authentication")
    .controller("registerController", RegisterController);

function RegisterController($scope, $uibModalInstance, loginModal) {
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
        $uibModalInstance.dismiss();
    };
    $scope.switchToLoginModal = function() {
        $scope.close();
        loginModal();
    };
}
