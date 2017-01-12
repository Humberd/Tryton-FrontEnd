import {SteamOpenIDConfig} from "../../../configs/steam-openid/SteamOpenIDConfig";
import IWindowService = angular.IWindowService;
import {Api} from "../../../services/api/Api";
import {ConnectDota2AccountRequestModel} from "./models/ConnectDota2AccountRequestModel";
import {Dota2AccountResponseModel} from "./models/Dota2AccountResponseModel";
import {Dota2AccountViewState} from "./Dota2AccountViewState";
export class DotaAccountController {
	accountModel: Dota2AccountResponseModel;
	viewState: Dota2AccountViewState = Dota2AccountViewState.INIT;

	connectedMethods: Object;
	disconnectedMethods: Object;

	constructor(private $window: IWindowService,
				private Api: Api) {
		this.checkRedirectFromSteam($window.location.search);
		this.generateConnectedMethods();
		this.generateDisconnectedMethods();
	}

	private checkRedirectFromSteam(params: string) {
		//first check if its a redirect from steam
		if (params && params.length > 50) {
			let model = new ConnectDota2AccountRequestModel();
			model.params = params;

			this.Api.dota2.connectDota2Account(model)
				.then((response) => {
					this.connectDota2AccountLocal(response);
				})
				.catch((response) => {
					this.disconnectDota2AccountLocal();
				})
		} else {
			this.downloadDota2Account();
		}
	}

	public downloadDota2Account(): void {
		this.Api.dota2.getDota2Account()
			.then(response => {
				this.connectDota2AccountLocal(response);
			})
			.catch((response: any) => {
				if (response.status == 404) {
					this.disconnectDota2AccountLocal();
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
			disconnectDota2AccountLocal: function () {
				return self.disconnectDota2AccountLocal.apply(self, arguments);
			}
		};
	}

	private generateDisconnectedMethods(): void {
		let self = this;
		this.disconnectedMethods = {
			getAccountModel: function () {
				return self.getAccountModel.apply(self, arguments);
			},
			connectDota2AccountLocal: function () {
				return self.connectDota2AccountLocal.apply(self, arguments);
			}
		}
	}

	public getAccountModel(): Dota2AccountResponseModel | null {
		return this.accountModel;
	}

	public connectDota2AccountLocal(dota2Account: Dota2AccountResponseModel): void {
		this.accountModel = dota2Account;
		this.viewState = Dota2AccountViewState.CONNECTED;
	}

	public disconnectDota2AccountLocal(): void {
		this.accountModel = null;
		this.viewState = Dota2AccountViewState.DISCONNECTED;
	}

	public setErrorState(): void {
		this.viewState = Dota2AccountViewState.ERROR;
	}

	/////////////////
	public isInitState(): boolean {
		return this.viewState == Dota2AccountViewState.INIT;
	}

	public isDisconnectedState(): boolean {
		return this.viewState == Dota2AccountViewState.DISCONNECTED;
	}

	public isConnectedState(): boolean {
		return this.viewState == Dota2AccountViewState.CONNECTED;
	}

	public isErrorState(): boolean {
		return this.viewState == Dota2AccountViewState.ERROR;
	}

}

(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Account")
		.controller("account_dota2.controller", DotaAccountController);
})();