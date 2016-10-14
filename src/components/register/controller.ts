import {RegisterUserRequestModel} from "./RegisterUserRequestModel";
(function() {
    "use strict";

    angular.module("TrytonApp.Register")
        .controller("registerController", RegisterController);

    function RegisterController($scope, RecaptchaKey, $mdDialog, Api) {
        var self = this;
        $scope.recaptchaKey = RecaptchaKey;
        $scope.register = {
            username: "",
            email: "",
            password: "",
            repeatPassword: ""
        };
        $scope.submit = function(registerForm) {
            //TODO validacja formularza
            //        console.log($scope.register); // wartosci
            //        console.log(registerForm); // bledy

            let registerModel = $scope.packData();

            Api.general.postRegister(registerModel)
                .then((data) => {
                    console.log(data);
                }, (err) => {
                    console.error(err);
                })
        };

        $scope.packData = function (): RegisterUserRequestModel {
            let registerModel: RegisterUserRequestModel = new RegisterUserRequestModel();
            registerModel.username = $scope.register.username;
            registerModel.email = $scope.register.email;
            registerModel.password = $scope.register.password;
            return registerModel;
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
