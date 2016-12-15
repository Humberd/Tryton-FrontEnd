import {RegisterUserRequestModel} from "./models/RegisterUserRequestModel";
import {Api} from "../../services/api/Api";
(function () {
	"use strict";

	angular.module("TrytonApp.Register")
		.controller("registerController", RegisterController);

	function RegisterController($scope, RecaptchaKey, $mdDialog, Api: Api) {
		let self = this;
		$scope.recaptchaKey = RecaptchaKey;
		$scope.formData = {
			username: "",
			email: "",
			password: "",
			repeatPassword: ""
		};
		$scope.register = function (registerForm) {
			//TODO validacja formularza
			//        console.log($scope.register); // wartosci
			//        console.log(registerForm); // bledy

			let registerModel = $scope.packData();

			Api.general.postRegister(registerModel)
				.then((data) => {
					$
				}, (err) => {
					console.error(err.data.message);
				})
		};

		$scope.packData = function (): RegisterUserRequestModel {
			let registerModel: RegisterUserRequestModel = new RegisterUserRequestModel();
			registerModel.username = $scope.register.username;
			registerModel.email = $scope.register.email;
			registerModel.password = $scope.register.password;
			return registerModel;
		};

		$scope.close = function () {
			$mdDialog.cancel();
		};
		$scope.switchToLoginModal = function () {
			$scope.close();
			self.loginModal()();
		};
	}
})();
