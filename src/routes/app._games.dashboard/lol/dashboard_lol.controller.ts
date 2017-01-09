import {TaskLolDB} from "./models/TaskLolDB";
import {Api} from "../../../services/api/Api";
import {LolGameTaskStatus} from "../../../models/constants/LolGameTaskStatus";
import {ViewHelpers} from "./ViewHelpers";
import IScope = angular.IScope;
import ITimeoutService = angular.ITimeoutService;

class LolController {
	readonly templateTasksListLoaderName = "lolDashboardTemplateTasksList";
	readonly myTasksListLoaderName = "lolDashboardMyTasksList";
	readonly verifyButtonLoaderName = "lolDashboardVerifyButton";

	readonly statusList: any = LolGameTaskStatus;
	selectedStatus = LolGameTaskStatus.IN_PROGRESS;

	readonly helpers: ViewHelpers = new ViewHelpers();

	templateTasksList: Array<TaskLolDB>;
	myTasksList: Array<Object>;

	constructor(private $scope: IScope,
				private Modal,
				private Api: Api,
				private Loader,
				private $timeout: ITimeoutService,
				private Session) {
		this.downloadTemplateTasksList();
		this.downloadMyTasksList(this.selectedStatus);
	}

	private downloadTemplateTasksList(): void {
		this.templateTasksList = null;
		this.Loader.startLoadingEventually(this.templateTasksListLoaderName);

		this.Api.lol.getAllTemplateTasks()
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

		this.Api.lol.getUserTasksByStatus(status)
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

	public verifyUserTasks(): void {
		this.Loader.startLoading(this.verifyButtonLoaderName);

		this.Api.lol.verifyUserTasks()
			.then(response => {
				console.log(response);
			})
			.finally(() => {
				this.Loader.stopLoading(this.verifyButtonLoaderName);
			})
	}

	public getUserLevel(): number {
		return this.Session.getLolProfile().profile.level;
	}
}

(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard")
		.controller("dashboard_lol.controller", LolController)
})();
