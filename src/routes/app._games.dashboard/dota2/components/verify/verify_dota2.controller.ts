import {VerifyLolTaskResponseModel} from "../../../lol/components/verify/models/VerifyLolTaskResponseModel";
export class Dota2TaskVerifyController {
	//auto data binding from modal
	analyzeResult: VerifyLolTaskResponseModel;
	errorMessage: string;

	constructor(private Session,
				private $mdDialog,
				private ExpToast) {
		this.showExpToast();
		this.updateProfile();
	}

	private showExpToast(): void {
		if (!this.analyzeResult || this.analyzeResult.tasks.length ===0) {
			return;
		}
		try {
			this.ExpToast.init(this.Session.getDota2Profile().profile.experience);
			this.analyzeResult.tasks.forEach((task) => {
				let gainedExp = task.task.result.acquired.exp;
				let taskName = task.task.template.name;
				this.ExpToast.addTask(gainedExp, taskName);
			})
		} catch (e) {
			console.error(e);
		}
	}

	private updateProfile(): void {
		this.Session.getDota2Profile().profile = this.analyzeResult.profile;
	}

	public closeModal(): void {
		this.$mdDialog.cancel();
	}
}

(function () {
    "use strict";

    angular.module("TrytonApp.Router.App._games.Dashboard.dota2Verify")
		.controller("dota2TaskVerifyController", Dota2TaskVerifyController);
})();