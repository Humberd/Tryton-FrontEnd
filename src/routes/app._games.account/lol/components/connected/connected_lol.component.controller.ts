import {Api} from "../../../../../services/api/Api";
import {LolGameAccount} from "../../models/LolGameAccount";
import {LolAccountResponseModel} from "../../models/LolAccountResponseModel";

export class ConnectedLolController{
	methods: {
		disconnectLolAccountLocal: () => void;
		getAccountModel: () => LolAccountResponseModel;
	};

	constructor(private Api: Api) {

	}

	public disconnectLolAccountApi(): void {
		this.Api.lol.disconnectAccount()
			.then(response => {
				this.methods.disconnectLolAccountLocal();
			})
	}

	public getLolAccount(): LolGameAccount {
		let accountModel = this.methods.getAccountModel();
		if (accountModel) {
			return accountModel.lolAccount;
		}
	}

	public getMasteryPageName(): string {
		let accountModel = this.methods.getAccountModel();
		if (accountModel) {
			return accountModel.masteryPageName;
		}
	}

}

