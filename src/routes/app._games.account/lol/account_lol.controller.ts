import IScope = angular.IScope;
import {Api} from "../../../services/api/Api";
import {LolGameAccount} from "./models/LolGameAccount";
import {ViewState} from "./ViewState";
import {MasteryPageNameLolResponseModel} from "./models/MasteryPageNameLolResponseModel";

class LolController {
	lolAccount: LolGameAccount;
	viewState: ViewState = ViewState.INIT;


	constructor(private $scope: IScope,
				private Api: Api) {
		this.downloadLolAccount();
	}

	public downloadLolAccount(): void {
		this.Api.lol.getAccount()
			.then(response => {
				this.connectLolAccountLocal(response);
			})
			.catch((response: any) => {
				if (response.status == 404) {
					this.disconnectLolAccountLocal();
				} else {
					this.setErrorState();
				}
			});
	}



	public getLolAccount(): LolGameAccount | null {
		return this.lolAccount;
	}

	public connectLolAccountLocal(lolAccount: LolGameAccount): void {
		lolAccount.details.region = lolAccount.details.region.toUpperCase();
		this.lolAccount = lolAccount;
		this.viewState = ViewState.CONNECTED;
	}

	public connectLolAccountLocalWrapper(): Function {
		return this.connectLolAccountLocal;
	}

	public disconnectLolAccountLocal(): void {
		this.lolAccount = null;
		this.viewState = ViewState.DISCONNECTED;
	}

	public setErrorState(): void {
		this.viewState = ViewState.ERROR;
	}

	/////////////////
	public isInitState(): boolean {
		return this.viewState == ViewState.INIT;
	}
	public isDisconnectedState(): boolean {
		return this.viewState == ViewState.DISCONNECTED;
	}
	public isConnectedState(): boolean {
		return this.viewState == ViewState.CONNECTED;
	}
	public isErrorState(): boolean {
		return this.viewState == ViewState.ERROR;
	}
}

(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Account")
		.controller("account_lol.controller", LolController)
})();