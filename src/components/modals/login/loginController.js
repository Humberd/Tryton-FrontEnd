angular.module("TrytonApp.Authentication")
    .controller("loginController", LoginController);

function LoginController($scope, $uibModalInstance, registerModal) {
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
        $uibModalInstance.dismiss();
    };
    $scope.switchToRegisterModal = function() {
        $scope.close();
        registerModal();
    };
}
