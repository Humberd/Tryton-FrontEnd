import {AbstractApi} from "../AbstractApi";
import {Dota2GameAccount} from "../../../models/user/Dota2GameAccount";
import {Dota2AccountResponseModel} from "../../../routes/app._games.account/dota2/models/Dota2AccountResponseModel";
import {ConnectDota2AccountRequestModel} from "../../../routes/app._games.account/dota2/models/ConnectDota2AccountRequestModel";
import {ResponseMessage} from "../../../models/ResponseMessage";
import {TaskDota2DB} from "../../../routes/app._games.dashboard/dota2/models/TaskDota2DB";
import {LolGameTaskStatus} from "../../../models/constants/LolGameTaskStatus";
import {Dota2ProfileModel} from "../../session/models/Dota2ProfileModel";
import {SubmitDota2TaskRequestModel} from "../../../routes/app._games.dashboard/dota2/components/newTask/models/SubmitDota2TaskRequestModel";
import {CancelDota2TaskRequestModel} from "../../../routes/app._games.dashboard/dota2/components/cancelTask/models/CancelDota2TaskRequestModel";

export class ApiDota2 extends AbstractApi {
	public getAllTemplateTasks(): IPromise<TaskDota2DB[]> {
		return this.get("game/dota2/tasks/templates/")
			.then(response => response.data);
	}

	public getTemplateTAskById(id: number|string): IPromise<TaskDota2DB> {
		return this.get(`game/dota2/tasks/templates/?id=${id}`)
			.then(response => response.data);
	}

	public getAllUserTasks(): IPromise<Object> {
		return this.get("game/dota2/tasks/user/")
			.then(response => response.data);
	}

	public getUserTasksByStatus(status: LolGameTaskStatus): IPromise<Array<Object>> {
		return this.get(`game/dota2/tasks/user/?status=${status || ""}`)
			.then(response => response.data);
	}

	public submitUserTask(data: SubmitDota2TaskRequestModel) {
		return this.post("game/dota2/tasks/user/submit/", data)
			.then(response => response.data);
	}

	public cancelUserTask(data: CancelDota2TaskRequestModel) {
		return this.post("game/dota2/tasks/user/cancel/", data)
			.then(response => response.data);
	}

	public verifyUserTasks(): IPromise<any> {
		return this.post("game/dota2/tasks/user/verify/")
			.then(response => response.data);
	}

	public getDota2Account(): IPromise<Dota2AccountResponseModel> {
		return this.get("game/dota2/account/")
			.then(response => response.data);
	}

	public getDota2AccountsHistory(): IPromise<Array<Dota2GameAccount>> {
		return this.get("game/dota2/account/history/")
			.then(response => response.data);
	}

	public connectDota2Account(data: ConnectDota2AccountRequestModel): IPromise<Dota2AccountResponseModel> {
		return this.post("game/dota2/account/connect/", data)
			.then(response => response.data);
	}

	public disconnectDota2Account(): IPromise<ResponseMessage> {
		return this.post("game/dota2/account/disconnect/")
			.then(response => response.data);
	}

	public getDota2Profile(): IPromise<Dota2ProfileModel> {
		return this.get("game/dota2/profile/")
			.then(response => response.data);
	}
}