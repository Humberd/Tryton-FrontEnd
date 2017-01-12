import {SteamOpenIDConfig} from "../../../configs/steam-openid/SteamOpenIDConfig";
import IWindowService = angular.IWindowService;
import {Api} from "../../../services/api/Api";
import {ConnectDota2AccountRequestModel} from "./models/ConnectDota2AccountRequestModel";
import {Dota2AccountResponseModel} from "./models/Dota2AccountResponseModel";
export class DotaAccountController {
	accountModel: Dota2AccountResponseModel;

	constructor(private SteamOpenIDConfig: SteamOpenIDConfig,
				private $window: IWindowService,
				private Api: Api) {
		this.checkRedirectFromSteam($window.location.search);
	}

	public openSteamLoginPage() {
		let url = this.SteamOpenIDConfig.generateValidLoginUrl();
		this.$window.location.replace(url);
	}

	private checkRedirectFromSteam(params: string) {
		if (params && params.length > 50) {
			let model = new ConnectDota2AccountRequestModel();
			model.params = params;
			this.Api.dota2.connectDota2Account(model)
				.then((foo) => {
					console.log(foo);
				})
		}
	}

}

(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Account")
		.controller("account_dota2.controller", DotaAccountController);
})();