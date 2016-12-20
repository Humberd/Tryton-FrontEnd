import {RegisterUserRequestModel} from "./models/RegisterUserRequestModel";
import {Api} from "../../services/api/Api";
(function () {
	"use strict";

	angular.module("TrytonApp.Register")
		.controller("registerController", RegisterController);

	function RegisterController($scope, RecaptchaKey, $mdDialog, Api: Api, Loader) {
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

			Loader.startLoading("registerLoader");

			Api.general.register(registerModel)
				.then((response) => {
					$mdDialog.hide(response);
				})
				.catch((err) => {
					console.error(err.data.message);
				})
				.finally(() => {
					Loader.stopLoading("registerLoader");
				})
		};

		$scope.packData = function (): RegisterUserRequestModel {
			let registerModel: RegisterUserRequestModel = new RegisterUserRequestModel();
			registerModel.username = $scope.formData.username;
			registerModel.email = $scope.formData.email;
			registerModel.password = $scope.formData.password;
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
