import {Api} from "../../../../../services/api/Api";
import {CancelLolTaskRequestModel} from "./models/CancelLolTaskRequestModel";
export class CancelLolTaskController {
	readonly loaderName: string = "cancelLolTaskFormLoader";

	task: any; //auto bind

	reason: string;

	constructor(private $mdDialog,
				private Api: Api,
				private Loader) {
		console.log(this.task);
	}

	public cancelTask(): void {
		let requestModel: CancelLolTaskRequestModel = {
			createdDate: this.task.createdDate,
			reason: this.reason || ""
		};

		this.Loader.startLoading(this.loaderName);

		this.Api.lol.cancelUserTask(requestModel)
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
		.controller("cancelLolTaskController", CancelLolTaskController)
})();