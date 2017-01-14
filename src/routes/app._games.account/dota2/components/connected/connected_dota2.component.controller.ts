import {Dota2AccountResponseModel} from "../../models/Dota2AccountResponseModel";
import {Api} from "../../../../../services/api/Api";
import {Dota2GameAccount} from "../../../../../models/user/Dota2GameAccount";
export class Dota2ConnectedComponent {
	readonly loaderName = "connectedDota2Account";

	methods: {
		disconnectDota2AccountLocal: () => void;
		getAccountModel: () => Dota2AccountResponseModel;
	};
	errorMessage: string;

	constructor(private Api: Api,
				private Loader,
				private Session,
				private SelectedGame) {

	}

	public disconnectDota2AccountApi(): void {
		this.Api.dota2.disconnectDota2Account()
			.then(response => {
				this.methods.disconnectDota2AccountLocal();
				this.Session.setProfile(this.SelectedGame.get(), null);
			})
	}

	public getDota2Account(): Dota2GameAccount {
		let accountModel = this.methods.getAccountModel();
		if (accountModel) {
			return accountModel.dota2Account;
		}
	}

}