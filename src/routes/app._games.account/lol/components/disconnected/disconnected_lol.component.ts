import {Api} from "../../../../../services/api/Api";
import {Regions} from "../../../../../models/constants/Region";
import {ConnectAccountLolRequestModel} from "../../models/ConnectAccountLolRequestModel";
import {LolAccountResponseModel} from "../../models/LolAccountResponseModel";
import IFormController = angular.IFormController;

export class DisconnectedLolController {
	readonly methods: {
		connectLolAccountLocal: (accountModel: LolAccountResponseModel) => void;
		getAccountModel: () => LolAccountResponseModel;
	};
	readonly loaderName = "disconnectedSummonerForm";

	regions = new Regions().toList();
	data: ConnectAccountLolRequestModel;
	errorMessage: string;

	constructor(private Api: Api,
				private Loader,
				private Logger) {
		this.clearData();
	}

	public connectLolAccountApi(summonerForm: IFormController): void {
		if (summonerForm.$invalid) {
			return;
		}
		this.Loader.startLoading(this.loaderName);
		this.Api.lol.connectAccount(this.data)
			.then((response) => {
				this.methods.connectLolAccountLocal(response);
				this.clearData();
			})
			.catch((response) => {
				console.log(response);
				this.Logger.error("%o", response);
				this.errorMessage = response.data.message;
			})
			.finally(() => {
				this.Loader.stopLoading(this.loaderName);
			})
	}


	public clearData(): void {
		this.data = new ConnectAccountLolRequestModel();
		this.errorMessage = null;
	}
}