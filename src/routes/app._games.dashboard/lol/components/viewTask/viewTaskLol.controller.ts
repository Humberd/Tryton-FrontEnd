export class ViewTaskLolController {
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

    angular.module("TrytonApp.Router.App._games.Dashboard.viewTaskLol")
    	.controller("viewTaskLolController", ViewTaskLolController);
})();