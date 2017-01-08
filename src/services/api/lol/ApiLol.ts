import {AbstractApi} from "../AbstractApi";
import {TaskLolDB} from "../../../routes/app._games.dashboard/lol/models/TaskLolDB";
import {SubmitLolTaskRequestModel} from "../../../routes/app._games.dashboard/lol/components/newTask/models/SubmitLolTaskRequestModel";
import {ConnectAccountLolRequestModel} from "../../../routes/app._games.account/lol/models/ConnectAccountLolRequestModel";
import {ResponseMessage} from "../../../models/ResponseMessage";
import {LolAccountResponseModel} from "../../../routes/app._games.account/lol/models/LolAccountResponseModel";
import {LolGameTaskStatus} from "../../../models/constants/LolGameTaskStatus";
import IPromise = angular.IPromise;
import {LolProfileModel} from "../../session/models/LolProfileModel";
import {LolGameAccount} from "../../../models/user/LolGameAccount";

export class ApiLol extends AbstractApi {
	public getAllTemplateTasks(): IPromise<TaskLolDB[]> {
		return this.get("game/lol/tasks/templates/")
			.then(response => response.data);
	}

	public getTemplateTaskById(id: number|string): IPromise<TaskLolDB> {
		return this.get(`game/lol/tasks/templates/?id=${id}`)
			.then(response => response.data);
	}

	public getAllUserTasks(): IPromise<Object> {
		return this.get("game/lol/tasks/user/")
			.then(response => response.data);
	}

	public getUserTasksByStatus(status: LolGameTaskStatus): IPromise<Array<Object>> {
		return this.get(`game/lol/tasks/user/?status=${status || ""}`)
			.then(response => response.data);
	}

	public submitUserTask(data: SubmitLolTaskRequestModel) {
		return this.post("game/lol/tasks/user/submit/", data)
			.then(response => response.data);
	}

	public verifyUserTasks(): IPromise<Array<any>> {
		return this.post("game/lol/tasks/user/verify/")
			.then(response => response.data);
	}

	public getLolAccount(): IPromise<LolAccountResponseModel> {
		return this.get("game/lol/account/")
			.then(response => response.data);
	}

	public getLolAccountsHistory(): IPromise<Array<LolGameAccount>> {
		return this.get("game/lol/account/history/")
			.then(response => response.data);
	}

	public connectLolAccount(data: ConnectAccountLolRequestModel): IPromise<LolAccountResponseModel> {
		return this.post("game/lol/account/connect/", data)
			.then(response => response.data);
	}

	public verifyLolAccount(): IPromise<LolAccountResponseModel> {
		return this.post("game/lol/account/verify/")
			.then(response => response.data);
	}

	public disconnectLolAccount(): IPromise<ResponseMessage> {
		return this.post("game/lol/account/disconnect/")
			.then(response => response.data);
	}

	public getLolProfile(): IPromise<LolProfileModel> {
		return this.get("game/lol/profile/")
			.then(response => response.data);
	}
}