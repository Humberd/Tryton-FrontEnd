import {LolGameTaskStatus} from "../../../models/constants/LolGameTaskStatus";
import {TaskDota2DB} from "./models/TaskDota2DB";
import {Api} from "../../../services/api/Api";
export class DotaController {
	readonly templateTasksListLoaderName = "dota2DashboardTemplateTasksList";
	readonly myTasksListLoaderName = "dota2DashboardMyTasksList";
	readonly verifyButtonLoaderName = "dota2DashboardVerifyButton";

	readonly statusList: any = LolGameTaskStatus;
	selectedStatus = LolGameTaskStatus.IN_PROGRESS;

	templateTasksList: Array<TaskDota2DB>;
	myTasksList: Array<Object>;

	constructor(private Modal,
				private Api: Api,
				private Loader,
				private Session) {
		this.downloadTemplateTasksList();
		this.downloadMyTasksList(this.selectedStatus);
	}

	private downloadTemplateTasksList(): void {
		this.templateTasksList = null;
		this.Loader.startLoadingEventually(this.templateTasksListLoaderName);

		this.Api.dota2.getAllTemplateTasks()
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

		this.Api.dota2.getUserTasksByStatus(status)
			.then((result) => {
				this.myTasksList = result;
			})
			.finally(() => {
				this.Loader.stopLoading(this.myTasksListLoaderName);
			})
	}

	public addNewTask(templateTask: TaskDota2DB): void {
		this.Modal.dota2NewTask({templateTask})
			.then(newTask => {
				if (this.selectedStatus === LolGameTaskStatus.IN_PROGRESS) {
					if (angular.isArray(this.myTasksList)) {
						this.myTasksList.push(newTask);
					}
				}
			})
	}

	public verifyUserTasks(): void {
		this.Loader.startLoadingEventually(this.verifyButtonLoaderName);

		this.Api.dota2.verifyUserTasks()
			.then(response => {
				this.Modal["verify_dota2"]({
					analyzeResult: response
				});
			})
			.finally(() => {
				this.Loader.stopLoading(this.verifyButtonLoaderName);
			})
	}

	public getUserLevel(): number {
		return this.Session.getDota2Profile().profile.level;
	}
}

(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard")
		.controller("dashboard_dota2.controller", DotaController)
})();