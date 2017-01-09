import {VerifyLolTaskResponseModel} from "./models/VerifyLolTaskResponseModel";
export class LolTaskVerifyController {
	//auto data binding from modal
	analyzeResult: VerifyLolTaskResponseModel;

	constructor(private Session,
				private $mdDialog) {
	}

	public closeModal(): void {
		this.Session.getLolProfile().profile = this.analyzeResult.profile;
		this.$mdDialog.cancel();
	}
}

(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard.verify")
		.controller("lolTaskVerifyController", LolTaskVerifyController);
})();