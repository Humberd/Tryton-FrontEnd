import {AbstractApi} from "../AbstractApi";
import {Dota2GameAccount} from "../../../models/user/Dota2GameAccount";
import {Dota2AccountResponseModel} from "../../../routes/app._games.account/dota2/models/Dota2AccountResponseModel";
import {ConnectDota2AccountRequestModel} from "../../../routes/app._games.account/dota2/models/ConnectDota2AccountRequestModel";
import {ResponseMessage} from "../../../models/ResponseMessage";

export class ApiDota2 extends AbstractApi {
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
}