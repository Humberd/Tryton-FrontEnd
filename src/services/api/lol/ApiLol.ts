import {AbstractApi} from "../AbstractApi";
import {TaskLolDB} from "../../../routes/app._games.dashboard/lol/models/TaskLolDB";
import {SubmitLolTaskRequestModel} from "../../../routes/app._games.dashboard/lol/components/newTask/models/SubmitLolTaskRequestModel";
import {ConnectAccountLolRequestModel} from "../../../routes/app._games.account/lol/models/ConnectAccountLolRequestModel";
import {ResponseMessage} from "../../../models/ResponseMessage";
import {LolAccountResponseModel} from "../../../routes/app._games.account/lol/models/LolAccountResponseModel";
import IPromise = angular.IPromise;
import {LolGameTaskStatus} from "../../../models/constants/LolGameTaskStatus";

export class ApiLol extends AbstractApi {
	public getAllTasks(): IPromise<TaskLolDB[]> {
		return this.get("task/lol/list/")
			.then(response => response.data);
	}

	public getTaskById(id: number|string): IPromise<TaskLolDB> {
		return this.get(`task/lol/list/${id}`)
			.then(response => response.data);
	}

	public submitTask(data: SubmitLolTaskRequestModel) {
		return this.post("task/lol/submit/", data)
			.then(response => response.data);
	}

	public getAccount(): IPromise<LolAccountResponseModel> {
		return this.get("accounts/lol/")
			.then(response => response.data)
			.then((account: LolAccountResponseModel) => {
				account.lolAccount.createdDate = new Date(account.lolAccount.createdDate);
				return account;
			})
	}

	public connectAccount(data: ConnectAccountLolRequestModel): IPromise<LolAccountResponseModel> {
		return this.post("accounts/lol/connect/", data)
			.then(response => response.data);
	}

	public verifyAccount(): IPromise<LolAccountResponseModel> {
		return this.post("accounts/lol/verify/")
			.then(response => response.data);
	}

	public disconnectAccount(): IPromise<ResponseMessage> {
		return this.post("accounts/lol/disconnect/")
			.then(response => response.data);
	}

	public getMyTasks(status?: LolGameTaskStatus): IPromise<Array<Object>> {
		return this.get(`task/lol/my/?status=${status || ""}`)
			.then(response => response.data);
	}


}