import {Api} from "../../../../../services/api/Api";
import {LolGameAccount} from "../../../../../models/user/LolGameAccount";
import {LolAccountResponseModel} from "../../models/LolAccountResponseModel";

export class ConnectedLolController {
	readonly loaderName = "connectedLolAccount";

	methods: {
		disconnectLolAccountLocal: () => void;
		getAccountModel: () => LolAccountResponseModel;
	};
	errorMessage: string;

	constructor(private Api: Api,
				private Loader) {

	}

	public disconnectLolAccountApi(): void {
		this.Api.lol.disconnectLolAccount()
			.then(response => {
				this.methods.disconnectLolAccountLocal();
			})
	}

	public verifyLolAccountApi(): void {
		this.Loader.startLoading(this.loaderName);

		this.Api.lol.verifyLolAccount()
			.then(response => {
				this.getLolAccount().verified = true;
				this.errorMessage = null;
			})
			.catch((err) => {
				console.log(err);
				this.errorMessage = err.data.message;
			})
			.finally(() => {
				this.Loader.stopLoading(this.loaderName);
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

