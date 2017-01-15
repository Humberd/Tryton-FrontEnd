import {CancelDota2TaskRequestModel} from "./models/CancelDota2TaskRequestModel";
import {Api} from "../../../../../services/api/Api";
export class CancelDota2TaskController {
	readonly loaderName: string = "cancelDota2TaskFormLoader";

	task: any; //auto bind

	reason: string;

	constructor(private $mdDialog,
				private Api: Api,
				private Loader) {
		console.log(this.task);
	}

	public cancelTask(): void {
		let requestModel: CancelDota2TaskRequestModel = {
			createdDate: this.task.createdDate,
			reason: this.reason || ""
		};

		this.Loader.startLoading(this.loaderName);

		this.Api.dota2.cancelUserTask(requestModel)
			.then((response) => {
				this.hideModal(response);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				this.Loader.stopLoading(this.loaderName);
			});
	}

	public hideModal(newTask: any): void {
		this.$mdDialog.hide(newTask);
	}

	public closeModal(): void {
		this.$mdDialog.cancel();
	}
}

(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard.cancelLolTask")
		.controller("cancelDota2TaskController", CancelDota2TaskController)
})();