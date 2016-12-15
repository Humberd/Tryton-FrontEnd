import {Api} from "../../services/api/Api";
(function() {
    "use strict";

    angular.module("TrytonApp.Login")
        .controller("loginController", LoginController);

    function LoginController($scope, $mdDialog, Api: Api) {
        let self = this;
        $scope.formData = {
        	username: "Humberd",
			password: "admin123"
		};
        $scope.login = function() {
        	console.log($scope.formData);
            Api.general.postLogin($scope.formData)
				.then((response) => {
            		$mdDialog.hide(response);
				}, (err) => {
            		console.error(err.data.message);
				});
            //TODO walidacja formularza
            //        console.log($scope.login); // wartosci

            // if ($scope.login.email.length > 0) {
            //     $scope.login.username = $scope.login.email;
            //     $uibModalInstance.close($scope.login);
            // }
        };
        $scope.close = function() {
            $mdDialog.cancel();
        };
        $scope.switchToRegisterModal = function() {
            $scope.close();
            self.registerModal()();
        };
    }
})();
