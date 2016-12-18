import {TaskLolDB} from "./models/TaskLolDB";
import {Api} from "../../../services/api/Api";
import IScope = angular.IScope;
import ITimeoutService = angular.ITimeoutService;

class LolController {
	private taskListLoaderName = "lolDashboardTemplateTasksList";
	templateTasksList: Array<TaskLolDB>;

	constructor(private $scope: IScope,
				private Modal,
				private Api: Api,
				private Loader,
				private $timeout: ITimeoutService) {
		this.downloadTemplateTasksList();
	}

	private downloadTemplateTasksList() {
		this.templateTasksList = null;
		this.Loader.startLoadingEventually(this.taskListLoaderName);

		this.Api.lol.getAllTasks()
			.then((result) => {
				this.templateTasksList = result;
			})
			.finally(() => {
				this.Loader.stopLoading(this.taskListLoaderName);
			})
	}

	public addNewTask(templateTask: TaskLolDB) {
		this.Modal.newTask({templateTask})
	}
}

(function () {
    "use strict";

    angular.module("TrytonApp.Router.App._games.Dashboard")
		.controller("dashboard_lol.controller", LolController)
})();