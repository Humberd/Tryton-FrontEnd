angular.module("TrytonApp")
    .directive("userNavBar", UserNavBar)
    .controller("userNavBarController", UserNavBarController);


function UserNavBar(ViewUrl) {
    return {
        restrict: "A",
        templateUrl: ViewUrl + "userNavBar.html",
        controller: "userNavBarController"
    };
}

function UserNavBarController($scope, Modal, Auth, Logger) {
    $scope.openLoginModal = function openLoginModal() {
        var resolver = {
            registerModal: function() {
                return $scope.openRegisterModal;
            }
        };
        Modal("login.html", "loginController", "login", resolver).result
            .then(function(result) {
                Auth.login(result);
            }, function(reason) {

            });
    };
    $scope.openRegisterModal = function openRegisterModal() {
        var resolver = {
            loginModal: function() {
                return $scope.openLoginModal;
            }
        };
        Modal("register.html", "registerController", "register", resolver).result
            .then(function(result) {
                Auth.register(result);
            }, function(reason) {

            });
    };
    $scope.logout = function logout() {
        Auth.logout();
    };
}
