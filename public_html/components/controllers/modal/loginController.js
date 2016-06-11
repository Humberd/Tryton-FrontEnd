var app = angular.module("TrytonApp");
app.controller("loginController", function ($scope, $uibModalInstance, registerModal) {
    $scope.login = function () {
        
    };  
    $scope.close = function () {
        $uibModalInstance.dismiss();
    };
    $scope.switchToRegisterModal = function () {
        $scope.close();
        registerModal();
    };
});