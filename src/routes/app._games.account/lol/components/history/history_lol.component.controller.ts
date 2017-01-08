import {Api} from "../../../../../services/api/Api";
import {LolGameAccount} from "../../../../../models/user/LolGameAccount";

export class HistoryController {
	readonly loaderName: string = "accountsHistoryLoader";

	accounts: Array<LolGameAccount>;
	errorMessage: string;

	constructor(private Api: Api,
				private Loader) {
		this.downloadHistory();
	}

	public downloadHistory(): void {
		this.Loader.startLoadingEventually(this.loaderName);

		this.Api.lol.getLolAccountsHistory()
			.then((response) => {
				this.accounts = response;
			})
			.catch((err) => {
				console.error(err);
				this.errorMessage = err.data.message;
			})
			.finally(() => {
				this.Loader.stopLoading(this.loaderName);
			})
	}

}