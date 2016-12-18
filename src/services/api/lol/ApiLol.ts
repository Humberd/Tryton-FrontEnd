import {AbstractApi} from "../AbstractApi";
import {TaskLolDB} from "../../../routes/app._games.dashboard/lol/models/TaskLolDB";
import IPromise = angular.IPromise;
import {SubmitLolTaskRequestModel} from "../../../routes/app._games.dashboard/lol/components/newTask/models/SubmitLolTaskRequestModel";
import {LolGameAccount} from "../../../routes/app._games.account/lol/models/LolGameAccount";
import {MasteryPageNameLolResponseModel} from "../../../routes/app._games.account/lol/models/MasteryPageNameLolResponseModel";
import {ConnectAccountLolRequestModel} from "../../../routes/app._games.account/lol/models/ConnectAccountLolRequestModel";
import {ResponseMessage} from "../../../models/ResponseMessage";

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

	public getAccount(): IPromise<LolGameAccount> {
		return this.get("accounts/lol/")
			.then(response => response.data)
			.then((account: LolGameAccount) => {
				account.createdDate = new Date(account.createdDate);
				return account;
			})
	}

	public connectAccount(data: ConnectAccountLolRequestModel): IPromise<MasteryPageNameLolResponseModel> {
		return this.post("accounts/lol/connect/")
			.then(response => response.data);
	}

	public getMasteryPageName(): IPromise<MasteryPageNameLolResponseModel> {
		return this.get("accounts/lol/verify/masteryPageName/")
			.then(response => response.data);
	}

	public verifyAccount(): IPromise<LolGameAccount> {
		return this.post("accounts/lol/verify/")
			.then(response => response.data);
	}

	public disconnectAccount(): IPromise<ResponseMessage> {
		return this.post("accounts/lol/disconnect/")
			.then(response => response.data);
	}
}