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
	myTasksList: Array<any>;

	constructor(private Modal,
				private Api: Api,
				private Loader,
				private Session,
				private $state) {
		this.downloadTemplateTasksList();
		this.downloadMyTasksList(this.selectedStatus);

		if (!Session.getLolProfile()) {
			$state.go("app._games.account");
		}
	}

	private downloadTemplateTasksList(): void {
		this.templateTasksList = null;
		this.Loader.startLoadingEventually(this.templateTasksListLoaderName);

		this.Api.lol.getAllTemplateTasks()
			.then((result) => {
				this.templateTasksList = result;
				// this.cancelTask(result[0]);
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
				// this.viewTask(result[0]);
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
		this.Loader.startLoadingEventually(this.verifyButtonLoaderName);

		this.Api.lol.verifyUserTasks()
			.then(response => {
				this.Modal.verify({
					analyzeResult: response
				});
			})
			.finally(() => {
				this.Loader.stopLoading(this.verifyButtonLoaderName);
			})
	}

	public cancelTask(task): void {
		this.Modal.cancelLolTask({task})
			.then((newTask) => {
				//remove task from in progress list
				for (let i = 0, size = this.myTasksList.length; i < size; i++) {
					if (this.myTasksList[i].createdDate === newTask.createdDate) {
						this.myTasksList.splice(i, 1);
					}
				}
			})
	}

	public viewTask(task): void {
		this.Modal.viewTaskLol({task});
	}

	public getUserLevel(): number {
		return this.Session.getLolProfile().profile.level;
	}

	public getUserExp(): number {
		return this.Session.getLolProfile().profile.experience;
	}
}

(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard")
		.controller("dashboard_lol.controller", LolController)
})();
