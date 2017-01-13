import {VerifyLolTaskResponseModel} from "../../../lol/components/verify/models/VerifyLolTaskResponseModel";
export class Dota2TaskVerifyController {
	//auto data binding from modal
	analyzeResult: VerifyLolTaskResponseModel;

	constructor(private Session,
				private $mdDialog) {
	}

	public closeModal(): void {
		this.Session.getDota2Profile().profile = this.analyzeResult.profile;
		this.$mdDialog.cancel();
	}
}

(function () {
    "use strict";

    angular.module("TrytonApp.Router.App._games.Dashboard.dota2Verify")
		.controller("dota2TaskVerifyController", Dota2TaskVerifyController);
})();