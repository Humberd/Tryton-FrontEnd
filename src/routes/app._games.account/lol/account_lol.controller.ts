import IScope = angular.IScope;
import {Api} from "../../../services/api/Api";

class LolController {

	constructor(private $scope: IScope,
				private Api: Api) {
		console.log("dupa");
	}
}

(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Account")
		.controller("account_lol.controller", LolController)
})();