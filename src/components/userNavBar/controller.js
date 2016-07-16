(function() {
    "use strict";

    angular.module("TrytonApp")
        .controller("userNavBarController", UserNavBarController);

    function UserNavBarController($scope, Modal, Auth, Logger, $translate, LanguageList) {
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
        $scope.LanguageList = LanguageList;
        $scope.selectedLanguage = $translate.proposedLanguage() || $translate.use();

        $scope.$watch("selectedLanguage", function(newVal, oldVal) {
            if (angular.isString(newVal) && newVal !== oldVal) {
                $translate.use(newVal);
            }
        });
    }

})();
