var app = angular.module("TrytonApp");
app.directive("userNavBar", function (ViewUrl) {
    return {
        restrict: "A",
        templateUrl: ViewUrl + "userNavBar.html",
        controller: "userNavBarController"
    };
});
app.controller("userNavBarController", function ($scope, Modal) {
    $scope.openLoginModal = function openLoginModal() {
        var resolver = {
            registerModal: function () {
                return $scope.openRegisterModal;
            }
        };
        Modal("login.html", "loginController", "login", resolver).result
                .then(function (result) {

                }, function (reason) {

                });
    };
    $scope.openRegisterModal = function openRegisterModal() {
        var resolver = {
            loginModal: function () {
                return $scope.openLoginModal;
            }
        };
        Modal("register.html", "registerController", "register", resolver).result
                .then(function (result) {

                }, function (reason) {

                });
    };
    $scope.openLoginModal();
});