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
	readonly connectForm: IFormController;

	regions = new Regions().toList();
	model: ConnectAccountLolRequestModel;
	errorMessage: string;

	constructor(private Api: Api,
				private Loader,
				private Logger) {
	}

	public connectLolAccount(): void {
		this.Loader.startLoading(this.loaderName);

		this.Api.lol.connectLolAccount(this.model)
			.then((response) => {
				this.clearForm();
				this.methods.connectLolAccountLocal(response);
			})
			.catch((err) => {
				this.Logger.error("%o", err);
				this.errorMessage = err.data.message;
			})
			.finally(() => {
				this.Loader.stopLoading(this.loaderName);
			})
	}


	public clearForm(): void {
		this.model = new ConnectAccountLolRequestModel();
		this.errorMessage = null;
	}
}