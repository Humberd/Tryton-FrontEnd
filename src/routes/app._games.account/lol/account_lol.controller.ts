import IScope = angular.IScope;
import {Api} from "../../../services/api/Api";
import {ViewState} from "./ViewState";
import {LolAccountResponseModel} from "./models/LolAccountResponseModel";

class LolController {
	accountModel: LolAccountResponseModel;
	viewState: ViewState = ViewState.INIT;

	connectedMethods: Object;
	disconnectedMethods: Object;

	constructor(private $scope: IScope,
				private Api: Api,
				private Session) {
		this.downloadLolAccount();
		this.generateConnectedMethods();
		this.generateDisconnectedMethods();
	}

	public downloadLolAccount(): void {
		this.Api.lol.getLolAccount()
			.then(response => {
				this.Session.getLolProfile().account = response.lolAccount;
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

	private generateConnectedMethods(): void {
		let self = this;
		this.connectedMethods = {
			getAccountModel: function () {
				return self.getAccountModel.apply(self, arguments);
			},
			disconnectLolAccountLocal: function () {
				return self.disconnectLolAccountLocal.apply(self, arguments);
			}
		};
	}

	private generateDisconnectedMethods(): void {
		let self = this;
		this.disconnectedMethods = {
			getAccountModel: function () {
				return self.getAccountModel.apply(self, arguments);
			},
			connectLolAccountLocal: function () {
				return self.connectLolAccountLocal.apply(self, arguments);
			}
		}
	}

	public getAccountModel(): LolAccountResponseModel | null {
		return this.accountModel;
	}

	public connectLolAccountLocal(lolAccount: LolAccountResponseModel): void {
		this.accountModel = lolAccount;
		this.viewState = ViewState.CONNECTED;
	}

	public disconnectLolAccountLocal(): void {
		this.accountModel = null;
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