var app = angular.module("Authentication");
app.controller("registerController", function ($scope, $uibModalInstance, loginModal) {
    $scope.submit = function () {
        console.log($scope.register);
    };
    $scope.close = function () {
        $uibModalInstance.dismiss();
    };
    $scope.switchToLoginModal = function () {
        $scope.close();
        loginModal();
    };
});