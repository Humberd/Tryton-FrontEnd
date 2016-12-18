import {LolGameAccount} from "../../models/LolGameAccount";
import {Api} from "../../../../../services/api/Api";
import {Regions} from "../../../../../models/constants/Region";
import {ConnectAccountLolRequestModel} from "../../models/ConnectAccountLolRequestModel";
import {MasteryPageNameLolResponseModel} from "../../models/MasteryPageNameLolResponseModel";

abstract class BindedMethods {
	protected getLolAccount(): LolGameAccount | any {
		return
	}
	protected connectLolAccountLocal(): (lolAccount: LolGameAccount) => void {
		return;
	}
}

export class DisconnectedLolController extends BindedMethods {
	regions = new Regions().toList();
	data: ConnectAccountLolRequestModel;

	constructor(private Api: Api) {
		this.clearData();
	}

	public connectLolAccountApi(): void {
		this.Api.lol.connectAccount(this.data)
			.then((response) => {

			})
	}

	public clearData(): void {
		this.data = new ConnectAccountLolRequestModel();
	}
}