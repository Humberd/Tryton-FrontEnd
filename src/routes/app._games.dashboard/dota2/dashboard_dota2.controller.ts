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
	myTasksList: Array<any>;

	constructor(private Modal,
				private Api: Api,
				private Loader,
				private Session,
				private Logger,
				private $state) {
		this.downloadTemplateTasksList();
		this.downloadMyTasksList(this.selectedStatus);


		if (!Session.getDota2Profile()) {
			$state.go("app._games.account");
			this.$translate("TOAST.ACCOUNT-NOT-CONNECT")
				.then((translation) => {
					this.Toast.error(translation);
				});
		} else if (!Session.getDota2Profile().account) {
			$state.go("app._games.account");
			this.$translate("TOAST.ACCOUNT-NOT-CONNECT")
				.then((translation) => {
					this.Toast.error(translation);
				});
		} else if (!Session.getDota2Profile().account.verified) {
			$state.go("app._games.account");
			this.$translate("TOAST.ACCOUNT-NOT-VERIFIED")
				.then((translation) => {
					this.Toast.error(translation);
				});
		}
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
			.catch(response => {
				let errorMessage = response.data.message || response;
				this.Modal["verify_dota2"]({errorMessage});
				this.Logger.error(errorMessage)
			})
			.finally(() => {
				this.Loader.stopLoading(this.verifyButtonLoaderName);
			})
	}

	public cancelTask(task): void {
		this.Modal.cancelDota2Task({task})
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
		this.Modal.viewTaskDota2({task});
	}

	public getUserLevel(): number {
		return this.Session.getDota2Profile().profile.level;
	}

	public getUserExp(): number {
		return this.Session.getDota2Profile().profile.experience;
	}
}

(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard")
		.controller("dashboard_dota2.controller", DotaController)
})();