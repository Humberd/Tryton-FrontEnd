
import {Dota2GameAccount} from "../../../../../models/user/Dota2GameAccount";
import {Api} from "../../../../../services/api/Api";
export class Dota2HistoryController {
	readonly loaderName: string = "dota2AccountsHistoryLoader";

	accounts: Array<Dota2GameAccount>;
	errorMessage: string;

	constructor(private Api: Api,
				private Loader) {
		this.downloadHistory();
	}

	public downloadHistory(): void {
		this.Loader.startLoadingEventually(this.loaderName);

		this.Api.dota2.getDota2AccountsHistory()
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