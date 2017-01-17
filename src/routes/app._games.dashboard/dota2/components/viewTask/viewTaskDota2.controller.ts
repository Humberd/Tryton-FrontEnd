export class ViewTaskDota2Controller {
	constructor(private $mdDialog) {
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

	angular.module("TrytonApp.Router.App._games.Dashboard.viewTaskDota2")
		.controller("viewTaskDota2Controller", ViewTaskDota2Controller);
})();