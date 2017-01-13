import {VerifyLolTaskResponseModel} from "./models/VerifyLolTaskResponseModel";
export class LolTaskVerifyController {
	//auto data binding from modal
	analyzeResult: VerifyLolTaskResponseModel;

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
			this.ExpToast.init(this.Session.getLolProfile().profile.experience);
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
		this.Session.getLolProfile().profile = this.analyzeResult.profile;
	}

	public closeModal(): void {
		this.$mdDialog.cancel();
	}
}

(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard.verify")
		.controller("lolTaskVerifyController", LolTaskVerifyController);
})();