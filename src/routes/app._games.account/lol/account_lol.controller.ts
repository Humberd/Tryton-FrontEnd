import IScope = angular.IScope;
import {Api} from "../../../services/api/Api";
import {LolGameAccount} from "./models/LolGameAccount";
import {ViewState} from "./ViewState";
import {Region} from "../../../models/constants/Region";

class LolController {
	lolAccount: LolGameAccount;

	viewState: ViewState;
	regions = Region;



	constructor(private $scope: IScope,
				private Api: Api) {
		console.log(Region);

	}

	public downloadLolAccount(): void {
		this.Api.lol.getAccount()
			.then((response) => {
				this.lolAccount = response;
			})
	}
}

(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Account")
		.controller("account_lol.controller", LolController)
})();