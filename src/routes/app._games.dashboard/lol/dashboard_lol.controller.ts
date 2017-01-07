import {TaskLolDB} from "./models/TaskLolDB";
import {Api} from "../../../services/api/Api";
import {LolGameTaskStatus} from "../../../models/constants/LolGameTaskStatus";
import {ViewHelpers} from "./ViewHelpers";
import IScope = angular.IScope;
import ITimeoutService = angular.ITimeoutService;

class LolController {
	readonly templateTasksListLoaderName = "lolDashboardTemplateTasksList";
	readonly myTasksListLoaderName = "lolDashboardMyTasksList";

	readonly statusList: any = LolGameTaskStatus;
	selectedStatus = LolGameTaskStatus.IN_PROGRESS;

	readonly helpers: ViewHelpers = new ViewHelpers();

	templateTasksList: Array<TaskLolDB>;
	myTasksList: Array<Object>;

	constructor(private $scope: IScope,
				private Modal,
				private Api: Api,
				private Loader,
				private $timeout: ITimeoutService) {
		this.downloadTemplateTasksList();
		this.downloadMyTasksList(this.selectedStatus);
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

	public downloadMyTasksList(status: LolGameTaskStatus): void {
		this.myTasksList = null;
		this.Loader.startLoadingEventually(this.myTasksListLoaderName);

		this.Api.lol.getMyTasks(status)
			.then((result) => {
				this.myTasksList = result;
			})
			.finally(() => {
				this.Loader.stopLoading(this.myTasksListLoaderName);
			})
	}

	public addNewTask(templateTask: TaskLolDB): void {
		this.Modal.newTask({templateTask})
			.then((newTask) => {
				if (this.selectedStatus === LolGameTaskStatus.IN_PROGRESS) {
					if (angular.isArray(this.myTasksList)) {
						this.myTasksList.push(newTask);
					}
				}
			})
	}
}

(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard")
		.controller("dashboard_lol.controller", LolController)
})();
