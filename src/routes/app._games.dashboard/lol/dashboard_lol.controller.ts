import {TaskLolDB} from "./models/TaskLolDB";
import {Api} from "../../../services/api/Api";
import IScope = angular.IScope;
import ITimeoutService = angular.ITimeoutService;
import {LolGameTaskStatus} from "../../../models/constants/LolGameTaskStatus";

class Helpers {
	public calculateProgress(obj: any): number {
		let wanted = obj.settings.times.value;
		let made = wanted - obj.progress.remainingCompletions;
		return made / wanted * 100;
	}
}

class LolController {
	readonly templateTasksListLoaderName = "lolDashboardTemplateTasksList";
	readonly myTasksListLoaderName = "lolDashboardMyTasksList";

	readonly helpers: Helpers = new Helpers();

	templateTasksList: Array<TaskLolDB>;
	myTasksList: Array<Object>;

	constructor(private $scope: IScope,
				private Modal,
				private Api: Api,
				private Loader,
				private $timeout: ITimeoutService) {
		this.downloadTemplateTasksList();
		this.downloadMyTasksList();
	}

	private downloadTemplateTasksList(): void {
		this.templateTasksList = null;
		this.Loader.startLoadingEventually(this.templateTasksListLoaderName);

		this.Api.lol.getAllTasks()
			.then((result) => {
				this.templateTasksList = result;
			})
			.finally(() => {
				this.Loader.stopLoading(this.templateTasksListLoaderName);
			})
	}

	private downloadMyTasksList(): void {
		this.myTasksList = null;
		this.Loader.startLoadingEventually(this.myTasksListLoaderName);

		this.Api.lol.getMyTasks(LolGameTaskStatus.IN_PROGRESS)
			.then((result) => {
				this.myTasksList = result;
				console.log(result);
			})
			.finally(() => {
				this.Loader.stopLoading(this.myTasksListLoaderName);
			})
	}

	public addNewTask(templateTask: TaskLolDB): void {
		this.Modal.newTask({templateTask})
	}
}

(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard")
		.controller("dashboard_lol.controller", LolController)
})();
