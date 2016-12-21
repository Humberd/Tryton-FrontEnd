import {Api} from "../../services/api/Api";
import {ChangePasswordRequestModel} from "./models/ChangePasswordRequestModel";
import IFormController = angular.IFormController;
class PasswordController {
	readonly loaderName = "changePasswordLoader";
	readonly changeForm: IFormController;

	model: ChangePasswordRequestModel;
	errorMessage: string;

	constructor(private Loader,
				private Api: Api,
				private Logger,
				private $mdToast) {
		this.$mdToast.show(this.$mdToast.simple().textContent('Hello!'));
	}

	public changePassword(): void {
		this.Loader.startLoading(this.loaderName);

		this.Api.general.changePassword(this.model)
			.then((response) => {
				this.clearForm();
			})
			.catch((err) => {
				this.Logger.error("%o", err);
				this.errorMessage = err.data.message;
			})
			.finally(() => {
				this.Loader.stopLoading(this.loaderName);
			})
	}

	private clearForm(): void {
		this.model = new ChangePasswordRequestModel();
		this.errorMessage = null;
		this.changeForm.$setUntouched();
		this.changeForm.$setPristine();
	}
}

(function () {
	"use strict";

	angular.module("TrytonApp.Router.App.Account.Password")
		.controller("AccountPasswordController", PasswordController)
})();