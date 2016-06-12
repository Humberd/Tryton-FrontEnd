var app = angular.module("Authentication", ["vcRecaptcha"]);
app.controller("loginController", function ($scope, $uibModalInstance, registerModal) {
    $scope.submit = function () {
        
    };  
    $scope.close = function () {
        $uibModalInstance.dismiss();
    };
    $scope.switchToRegisterModal = function () {
        $scope.close();
        registerModal();
    };
});