import IWindowService = angular.IWindowService;
export class SteamOpenIDConfig {
	constructor(private RawApiUrl: string,
				private $window: IWindowService) {

	}

	private getLoginUrl(): string {
		return "https://steamcommunity.com/openid/login";
	}

	private getLoginParams(): Object {
		let self = this;
		return {
			"openid.ns": "http://specs.openid.net/auth/2.0",
			"openid.mode": "checkid_setup",
			"openid.ns.sreg": "http://openid.net/extensions/sreg/1.1",
			"openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
			"openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
			"openid.realm": "http://" + self.$window.location.host,
			"openid.return_to": "http://" + self.$window.location.host + "/dota2/account",
		}
	}

	public generateValidLoginUrl(): string {
		let returnUrl: any = new URL(this.getLoginUrl());
		let loginParams = this.getLoginParams();
		Object.keys(loginParams)
			.forEach(addParam);

		function addParam(key, foo, dupa) {
			returnUrl.searchParams.append(key, loginParams[key]);
		}

		return returnUrl.toString();
	}
}

(function () {
	"use strict";

	angular.module("TrytonApp.Configs")
		.service("SteamOpenIDConfig", SteamOpenIDConfig);
})();