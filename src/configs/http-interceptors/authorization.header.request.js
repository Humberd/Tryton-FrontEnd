(function () {
	"use strict";

	angular.module("TrytonApp.Configs.HttpInterceptors")
		.factory("addUserTokenToRequest", AddUserTokenToRequest);

	function AddUserTokenToRequest(Session, RawApiUrl, Logger) {
		var apiHostName = new URL(RawApiUrl).hostname;
		return {
			request: function (config) {
				var requestHostname;
				try {
					requestHostname = new URL(config.url).hostname;
				} catch (e) {
					return config;
				}

				if (apiHostName === requestHostname) {
					Logger.debug("Request url: %s is under domain of Api Url: %s. Adding Authorization header",
						config.url,
						RawApiUrl);

					if (Session.isLoggedIn()) {
						config.headers.Authorization = createAuthorizationHeader(Session.getUser());
					}

				}
				return config;
			}
		};

		function createAuthorizationHeader(tokenModel) {
			return "Bearer " + tokenModel.rawToken;
		}
	}
})();